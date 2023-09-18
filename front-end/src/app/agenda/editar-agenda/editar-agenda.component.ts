import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from 'src/app/auth';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.css']
})
export class EditarAgendaComponent {
  @ViewChild('formAgenda') formAgenda!: NgForm;
  @Input() agenda!: Agenda;

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
    this.getAgenda();
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
    console.log(this.formAgenda.value);
    console.log(this.agenda)
    // let formValues: any;
    // const dt: Date = new Date(this.formAgenda.value.data);
    // var dia = this.agendaService.obterDia(dt);
    // const idGestor = this.authService.getCurrentUser();

    // if (this.formAgenda.value.data == null) {
    //   SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
    // } else  {
    //   forkJoin([
    //     this.projetoService.buscarProjeto(this.formAgenda.value.cod_projeto),
    //     this.agendaService.getFuncaoGestor(idGestor)
    //   ]).subscribe({
    //     next: (results: [any, FuncaoGestor[]]) => {
    //       let projeto = results[0].projeto;
    //       let funcao_gestor = results[1][0];
    //       formValues = {
    //         ...this.formAgenda.value, funcao_gestor, projeto, dia,
    //       };
    //       console.log(formValues);
    //       // this.agendaService.updateAgenda(this.idAgenda,formValues).subscribe();
    //       SwalFacade.sucesso("Agenda atualizada com sucesso!");
    //       this.activeModal.close();
    //       console.log(formValues);
    //     },
    //     error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
    //   });
    // }
  }

  /**
   * @description Atribui ao formulario os valores contidos no objeto a ser editado
   */
  getAgenda() {
    this.dataSelecionada = this.agenda.data;
    this.atendimentoSelecionado = this.agenda.atendimento;
    this.horasSelecionado = Number(this.agenda.horas);
    this.projetoSelecionado = this.agenda.cod_projeto;
    this.tipoSelecionado = this.agenda.cod_tipo;
  }

  /**
   * @description Metodo para excluir um compromisso da agenda com a condição de que
   * o objeto não tenha mais de um mês de criação
   */
  excluir() {
    // Pega uma data um mes antes do dia de hoje
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
            this.agendaService.excluirAgenda(this.agenda.cod_agenda).subscribe();
            this.activeModal.close();
            SwalFacade.sucesso("Agenda excluída com sucessso");
          }
        })
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
