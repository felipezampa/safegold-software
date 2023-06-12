import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from 'src/app/auth';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

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
  @Input() cardData!: Agenda;
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
  obterDia(data: Date): string | undefined {
    // const dt: Date = new Date();
    const dayOfWeek: number = data.getDay();
    console.log('data->>>>' + data, dayOfWeek);
    // Retorna um indice do dia da semana sabado - domingo : 0 - 6
    // const diaSemana = data.getDay();

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
 * @description 
 * Metodo simples que recebe um dia e retorna qual dia da semana esse é
 * Exemplo: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'
 * 
 * @param data uma data comum no formato yyyy-mm-dd 
 * 
 * @returns Retorna uma string do dia 'Quarta-Feira'
 */
  salvar() {
    if (this.editMode == false) {
      if (this.formAgenda.value.cod_projeto == null && this.formAgenda.value.tipo == 'Projeto') {
        SwalFacade.alerta("Não foi possível salvar", "Selecione um projeto!");
      } else if (this.formAgenda.value.data == null) {
        SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
      } else {
        const dt: Date = new Date(this.formAgenda.value.data);
        var dia = this.obterDia(dt);
        const idGestor = this.authService.getCurrentUser();

        forkJoin([
          this.projetoService.buscarProjeto(this.formAgenda.value.cod_projeto),
          this.agendaService.getFuncaoGestor(idGestor)
        ]).subscribe({
          next: (results: [any, FuncaoGestor[]]) => {
            let projeto = results[0].projeto;
            let funcao_gestor = results[1][0];
            // const novoObjeto = { funcao_gestor: gestor };
            var formValues = {
              ...this.formAgenda.value,
              funcao_gestor,
              projeto,
              dia,
            };
            console.log(formValues);

            const format = 'dd/MM/yyyy';
            const locale = 'en-US';
            const dataFiltrada = formatDate(new Date(this.formAgenda.value.data), format, locale);
            this.agendaService.salvarAgenda(formValues).subscribe();
            SwalFacade.sucesso(dia + '  |  ' + dataFiltrada, "Agenda salva com sucesso!");
            this.activeModal.close();
          },
          error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
        });
      }
    } else {
      SwalFacade.alerta("Não implementado, só salva novos hehehe");
      // this.agendaService.updateAgenda(this.idAgenda,formValues).subscribe();
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
          this.dataSelecionada = ag.data;
          this.atendimentoSelecionado = ag.atendimento;
          this.horasSelecionado = ag.horas;
          this.projetoSelecionado = ag.cod_projeto;
          this.tipoSelecionado = ag.tipo;
        });
        const inputElement = document.getElementById('dataId') as HTMLInputElement;
        inputElement.readOnly = true;
      } else {
        // Caso não encontrado então levanta uma excecão
        SwalFacade.erro("Agenda não encontrada");
      }
    } else {
      // Se editMode == false entao estamos cadastrando um objeto
      // Para isso sera setado uns valores por padrao para ajudar o usuario
      this.tipoSelecionado = { id_tipo: 10, tipo: 'Projeto' };
      this.atendimentoSelecionado = 'Remoto';
      this.projetoSelecionado = null;
      this.horasSelecionado = 8;
    }
  }

  excluir() {
    if (this.editMode == false) {
      // Se o objeto não existe então não precisa excluir, basta apenas fechar o modal
      this.activeModal.close();
    } else {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const objectDate = new Date(this.dataSelecionada); // Replace 'object.date' with the actual date property of your object

      if (objectDate < oneMonthAgo) {
        // Delete the object or perform the desired operation
        SwalFacade.alerta("Não é possível excluir", "A agenda é mais antiga do que um mês!");
      } else {
        SwalFacade.excluir("Deseja Excluir essa agenda?")
          .then((result) => {
            if (result.isConfirmed) {
              console.log('Excluido');
              this.activeModal.close();
              SwalFacade.sucesso("Agenda excluída com sucessso");
            } else if (result.isDismissed) {
              console.log('cancelar');
            }
          })
      }
      //       // pensar em algo melhor quando o objeto estiver sendo criado, algo como esconder o botao de excluir ou sei la
      // /// IMPLEMENTAR ISSO AQUI
      // const dataAgenda = new Date(this.dataSelecionada.getFullYear(), this.dataSelecionada.getMonth(), this.dataSelecionada.getDate()).toUTCString();
      // const mesPassado = new Date();
      // mesPassado.setMonth(this.dataSelecionada.getMonth() - 1);
      // console.log(mesPassado, dataAgenda);

      // new Date(this.dataSelecionada.getFullYear(), this.dataSelecionada.getMonth(), this.dataSelecionada.getDate()).toUTCString();

      // console.log(mesPassado);
      // console.log(dataAgenda);
      // if (dataAgenda < mesPassado) {
      //   // Object is older than one month, cannot be deleted
      //   SwalFacade.alerta("Não é possível excluir", "A agenda é mais antiga do que um mês!");
      // } else {
      //   SwalFacade.excluir("Deseja Excluir essa agenda?")
      //     .then((result) => { 
      //       if (result.isConfirmed) {
      //         console.log('Excluido');
      //         this.activeModal.close();
      //         SwalFacade.sucesso("Agenda excluída com sucessso");
      //       } else if (result.isDismissed) {
      //         console.log('cancelar');
      //       }
      //     })
      // }
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
          this.tipoAgenda = tipo
        }
      }
    });
  }

}

