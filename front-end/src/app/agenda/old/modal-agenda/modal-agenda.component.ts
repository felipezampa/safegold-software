import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {
  @ViewChild('formAgenda') formAgenda!: NgForm;
  @Input() idAgenda!: number;
  @Input() editMode!: boolean;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: Projeto | null;
  atendimentoSelecionado!: String;
  horasSelecionado!: number;
  tipoSelecionado!: TipoAgenda | undefined;
  dataSelecionada!: Date;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    this.isUpdateOrCreate();
  }

  /**  
  * @description 
  * Metodo simples que recebe um dia e retorna qual dia da semana esse é
  * Exemplo: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'
  * 
  * @param data uma data comum no formato yyyy-mm-dd 
  * 
  * @returns Retorna uma string do dia 'Quarta-Feira'
  */
  salvar() {
    let formValues: any;
    const dt: Date = new Date(this.formAgenda.value.data);
    var dia = this.obterDia(dt);
    const idGestor = this.authService.getCurrentUser();
    if (this.formAgenda.value.data == null) {
      SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
    } else if (this.formAgenda.value.tipo.id_tipo == 10) {
      forkJoin([
        this.projetoService.buscarProjeto(this.formAgenda.value.cod_projeto),
        this.agendaService.getFuncaoGestor(idGestor)
      ]).subscribe({
        next: (results: [any, FuncaoGestor[]]) => {
          let projeto = results[0].projeto;
          let funcao_gestor = results[1][0];
          formValues = {
            ...this.formAgenda.value, funcao_gestor, projeto, dia,
          };
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
    } else {
      this.agendaService.getFuncaoGestor(idGestor).subscribe({
        next: (results: any) => {
          let funcao_gestor = results;
          let projeto = 'Feriado'
          formValues = {
            ...this.formAgenda.value, funcao_gestor, projeto, dia,
          };
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
    }

    if (this.editMode == false) {
      this.agendaService.salvarAgenda(formValues).subscribe();
      SwalFacade.sucesso("Agenda salva com sucesso!");
      this.activeModal.close();
      console.log(formValues);
      
    } else {
      this.agendaService.updateAgenda(this.idAgenda, formValues).subscribe();
      SwalFacade.sucesso("Agenda atualizada com sucesso!");
      this.activeModal.close();
    }
  }

  /**
   * @description O modal funciona tanto para atualizar ou inserir, o metodo ira verificar com a flag editMode
   * e caso seja atualizacao preenche com os dados do objeto caso contrario preenche com uns genericos
   */
  isUpdateOrCreate() {
    // Verifica se a flag de edicao eh verdadeira, ou seja se o action eh edicao e nao cadastro
    if (this.editMode == true) {
      // Testa se o id da empresa existe
      if (this.idAgenda !== undefined) {
        // Busca o objeto empresa com o ID passado
        this.agendaService.procurarAgenda(this.idAgenda).subscribe(ag => {
          // Atribui as instancias os valores da agenda
          this.dataSelecionada = ag.data;
          this.atendimentoSelecionado = ag.atendimento;
          this.horasSelecionado = ag.horas;
          this.projetoSelecionado = ag.cod_projeto;
          this.tipoSelecionado = new TipoAgenda(ag.tipo.id_tipo, ag.tipo.tipo);

          // Chamar listTipo() para buscar os tipos de agenda antes de definir o tipoSelecionado
          this.listTipo();
        });
        // Transforma o input de data para nao poder ser alterado
        const dataElement = document.getElementById('dataId') as HTMLInputElement;
        dataElement.readOnly = true;
      } else {
        // Caso não encontrado então levanta uma excecão
        SwalFacade.erro("Agenda não encontrada");
      }
    } else {
      // Se editMode == false entao estamos cadastrando um objeto
      // Para isso sera setado uns valores por padrao para ajudar o usuario
      this.atendimentoSelecionado = 'Remoto';
      this.projetoSelecionado = null;
      this.horasSelecionado = 8;
      // this.tipoSelecionado = new TipoAgenda(10, 'Projeto');
    }
  }

  /**
   * @description Metodo para excluir um compromisso da agenda com a condição de que
   * o objeto não tenha mais de um mês de criação
   */
  excluir() {
    if (this.editMode == false) {
      // Se o objeto não existe então não precisa excluir, basta apenas fechar o modal
      this.activeModal.close();
    } else {
      // Se o objeto existe, então pega uma data um mes antes do dia de hoje
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      // Data selecionada do objeto
      const objectDate = new Date(this.dataSelecionada);

      if (objectDate < oneMonthAgo) {
        // Se a data do objeto eh mais antiga que um mes atras a partir de hoje
        SwalFacade.alerta("Não é possível excluir", "A agenda é mais antiga do que um mês!");
      } else {
        // Caso contrario abre um popup SweetAlert com a opção de excluir ou cancelar
        SwalFacade.excluir("Deseja excluir a agenda?", "A ação não poderá ser desfeita")
          .then((result) => {
            if (result.isConfirmed) {
              this.agendaService.excluirAgenda(this.idAgenda).subscribe();
              this.activeModal.close();
              SwalFacade.sucesso("Agenda excluída com sucessso");
            }
          })
      }
    }
  }

  /**  
   * @description 
   * Metodo simples que recebe um dia e retorna qual dia da semana esse é
   * Exemplo: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'
   * 
   * @param data uma data comum no formato yyyy-mm-dd 
   * 
   * @returns Retorna uma string do dia 'Quarta-Feira'
   */
  obterDia(data: Date): string | undefined {
    const dayOfWeek: number = data.getDay();
    const diaSemana = dayOfWeek;

    switch (diaSemana) {
      case 0: return 'Segunda-Feira';
      case 1: return 'Terça-Feira';
      case 2: return 'Quarta-Feira';
      case 3: return 'Quinta-Feira';
      case 4: return 'Sexta-Feira';
      case 5: return 'Sábado';
      case 6: return 'Domingo';
      default: return undefined;
    }
  }

  /**
   * @description Lista todos os projeto para selecionar como opção na tag select input
   */
  listProjetos() {
    this.projetoService.listProjetos().subscribe({
      next: (data: Projeto[]) => {
        if (data == null) {
          this.projetos = [];
        } else {
          this.projetos = data;
          // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
          this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
        }
      },
    });
  }

  /**
   * @description Lista todos os tipos de agenda para selecionar como opção na tag select input
   */
  listTipo() {
    this.agendaService.listTipo().subscribe({
      next: (tipo: any[]) => {
        if (tipo == null) {
          this.tipoAgenda = [];
        } else {
          this.tipoAgenda = tipo;
          this.tipoAgenda.sort((a, b) => (a.tipo ?? '').localeCompare(b.tipo ?? ''));
  
          // Após buscar os tipos, defina o tipoSelecionado aqui, caso seja necessário
          if (this.editMode && this.tipoSelecionado) {
            // Encontre o tipo no array de tipos com o mesmo ID do tipoSelecionado
            this.tipoSelecionado = this.tipoAgenda.find((tipoAgenda) => tipoAgenda.id_tipo === this.tipoSelecionado?.id_tipo);
          } else{
            let t = new TipoAgenda(10, 'Projeto');
            this.tipoSelecionado = this.tipoAgenda.find((t) => t.id_tipo === this.tipoSelecionado?.id_tipo);
          }
        }
      }
    });
  }
}