import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';


@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  @ViewChild('formAgenda') formAgenda!: NgForm;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: number;
  atendimentoSelecionado!: string;
  horasSelecionado!: number;
  tipoSelecionado!: number;
  dataSelecionada!: Date | string;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    this.atendimentoSelecionado = 'Remoto';
    this.horasSelecionado = 8;
    this.tipoSelecionado = 10; // projeto
    this.projetoSelecionado = 0;
  }

  /**  
  * @description 
  * Salva a agenda atualizada
  */
  salvar() {
    let formValues: any;
    const dt: Date = new Date(this.formAgenda.value.data);
    var dia_semana = this.agendaService.obterDia(dt);
    const idGestor = this.authService.getCurrentUser();

    if (this.formAgenda.value.data == null) {
      SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
    } else {
      this.agendaService.getFuncaoGestor(idGestor).subscribe({
        next: (results: FuncaoGestor[]) => {
          // Um gestor pode ter varias funcoes, o codigo abaixo ira percorrer por todas as suas funcoes e
          // atribuir a funcao atual, ou seja aquela que nao tem data de fim
          let funcao_gestor;
          for (let i = 0; i < results.length; i++) {
            const element = results[i];
            if (results[i].data_fim == null) {
              funcao_gestor = results[i].id_func_gest;
            }
          }

          formValues = {
            ...this.formAgenda.value, funcao_gestor, dia_semana
          };
          this.agendaService.salvarAgenda(formValues).subscribe();
          SwalFacade.sucesso("Agenda salva com sucesso!");
          this.activeModal.close();
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
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
          this.projetos = data.filter(
            // Filtra os projetos para mostrar apenas os que estão ativos
            emp => emp.ativo == 1
          );
          this.projetos
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
        }
      }
    });
  }
}
