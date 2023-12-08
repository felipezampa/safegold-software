import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService, InserirProjetoComponent } from '../index';


@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent implements OnInit {
  @ViewChild('formAgenda') formAgenda!: NgForm;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: number | null;
  atendimentoSelecionado!: string | null;
  horasSelecionado!: number | null;
  tipoSelecionado!: number;
  dataSelecionada!: Date | string;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService, 
              private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    this.atendimentoSelecionado = 'Remoto';
    this.horasSelecionado = 8;
    this.tipoSelecionado = 10; // projeto
    this.projetoSelecionado = null;
  }

  
  /**
   * @description Salva a agenda, verificando se a data foi selecionada
   * e atribuindo a função do gestor ativa.
   */
  saveAgenda() {
    let formValues: any;
    const dt: Date = new Date(this.formAgenda.value.data);
    var dia_semana = this.agendaService.obterDia(dt);
    const idGestor = this.authService.getCurrentUser();

    if (this.formAgenda.value.data == null) {
      SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
    } else {
      this.agendaService.getFuncaoGestor(idGestor).subscribe({
        next: (results: FuncaoGestor[]) => {
          // Um gestor pode ter varias funcoes, o codigo abaixo ira percorrer por todas as 
          // suas funcoes e atribuir a funcao atual, ou seja aquela que nao tem data de fim
          let funcao_gestor;
          for (let i = 0; i < results.length; i++) {
            const element = results[i];
            if (results[i].data_fim == null) {
              funcao_gestor = results[i].id_func_gest;
            }
          }
          // Junta os valores do formulario, o funcao_gestor e os dados da data
          formValues = {
            ...this.formAgenda.value, funcao_gestor, dia_semana
          };
          this.agendaService.saveAgenda(formValues).subscribe();
          SwalFacade.sucesso("Agenda salva com sucesso!");
          this.activeModal.close();
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
    }
  }


  /**
   * @description Lista os projetos, filtrando e ordenando os ativos por nome de 
   * forma crescente.
   */
  listProjetos() {
    this.projetoService.listProjetos().subscribe({
      next: (data: Projeto[]) => {
        if (data == null) {
          this.projetos = [];
        } else {
          this.projetos = data.filter(
            // Filtra os projetos para mostrar apenas os que estão ativos
            proj => proj.ativo == true
          );
          this.projetos
          // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
          this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
        }
      },
    });
  }


  /**
   * @description Lista os tipos de agenda, ordenando por nome de forma crescente.
   */
  listTipo() {
    this.agendaService.listTipo().subscribe({
      next: (tipo: any[]) => {
        if (tipo == null) {
          this.tipoAgenda = [];
        } else {
          this.tipoAgenda = tipo;
          this.tipoAgenda.sort((a, b) => (a.tipo ?? '').localeCompare(b.tipo ?? ''));
        }
      }
    });
  }


  /**
   * @description Manipula a mudança de tipo, atualizando a lista 
   * de projetos e configurações com base no tipo selecionado.
   */
  onTipoChange() {
    const tipo = this.tipoSelecionado;

    if (tipo == 10 || tipo == 6 || tipo == 8) {
      //  PROJETO || FECHAMENTO || OVERVIEW 
      this.listProjetos();
      this.horasSelecionado = 8;
      this.atendimentoSelecionado = 'Remoto';
    } else if (tipo == 7 || tipo == 4) {
      this.listProjetos();
      //  ADMINISTRATIVO ||  EVENTO
      this.projetos = this.projetos.filter(
        proj => proj.cod_projeto == 1 //SG
      )
      this.horasSelecionado = 8;
      this.atendimentoSelecionado = 'Presencial';
      this.projetoSelecionado = 1;
    } else if (tipo == 5 || tipo == 9) {
      // PROSPECÇÂO || CURSO
      this.projetos = [];
      this.horasSelecionado = 8;
      this.atendimentoSelecionado = 'Presencial';
      this.projetoSelecionado = null;
    } else if (tipo == 2 || tipo == 3) {
      //  FOLGA || FERIADO 
      this.projetos = [];
      this.horasSelecionado = null;
      this.atendimentoSelecionado = null;
      this.projetoSelecionado = null;
    }
  }


  /**
   * @description Abre uma janela modal para criar um novo projeto.
   */
  newProjeto() {
    this.modalService.open(InserirProjetoComponent, { size: 'lg' });
  }

}
