import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { InserirProjetoComponent } from '../inserir-projeto/inserir-projeto.component';
import { AgendaService } from '../services/agenda.service';


@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.css']
})
export class EditarAgendaComponent {
  @ViewChild('formAgenda') formAgenda!: NgForm;
  @Input() agenda!: Agenda;
  @Input() canEdit!: boolean;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  horasSelecionado!: number | null;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    this.getAgenda();
  }

  /**  
  * @description 
  * Salva a agenda atualizada
  */
  salvar() {
    // Nem todos os valores passados pelo formulario serao necessarios para fazer o patch
    // por isso eu somente seleciono aqueles que me interessam
    let formValues = {
      atendimento: this.agenda.atendimento,
      cod_projeto: this.formAgenda.value.cod_projeto,
      cod_tipo: this.agenda.cod_tipo,
      horas: this.formAgenda.value.horas
    };
    console.log(formValues);
    
    try {
      this.agendaService.updateAgenda(this.agenda.cod_agenda, formValues).subscribe();
      SwalFacade.sucesso("Agenda atualizada com sucesso!");
      this.activeModal.close();
    } catch (error) {
      SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
    }
  }

  /**
   * @description Atribui ao formulario os valores contidos no objeto a ser editado
   */
  getAgenda() {
    this.horasSelecionado = Number(this.agenda.horas);
    this.getProjeto(this.agenda.cod_projeto)
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
    const objectDate = new Date(this.agenda.data);

    if (objectDate < oneMonthAgo) {
      // Se a data do objeto eh mais antiga que um mes atras a partir de hoje
      SwalFacade.alerta("Não é possível excluir", "A agenda é mais antiga do que um mês!");
    } else {
      // Caso contrario abre um popup SweetAlert com a opção de excluir ou cancelar
      SwalFacade.excluir("Excluir", "Deseja excluir a agenda?", "A ação não poderá ser desfeita")
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
   * @description Metodo importante, o `listProjetos()` tem o filtro de projetos ativos somente
   * ou seja, caso um projeto nao estiver ativo nao ira aparecer no dropdown do html
   * entao esse metodo vai procurar esse projeto e caso ele nao esteja ativo entao adiciona ele ao array
   */
  getProjeto(id: number | null) {
    let tipo = this.agenda.cod_tipo;

    if (tipo !== 2 && tipo !== 3 && tipo !== 5 && tipo !== 9 && id) {
      this.projetoService.find(id).subscribe({
        next: (proj: any) => {
          if (proj.ativo == 0) {

            this.projetos.push(proj)
            // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
            this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
          }
        },
        error: () => { SwalFacade.erro("Projeto não encontrado", "Não foi possível encontrar o projeto da agenda") }
      })

    } else {
      // se não tiver projetos não precisa buscar
    }
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

  onTipoChange() {
    const tipo = this.agenda.cod_tipo;

    if (tipo == 10 || tipo == 6 || tipo == 8) {
      //  PROJETO || FECHAMENTO || OVERVIEW 
      this.listProjetos();
      // this.listProjetos();
      // this.projetos = data.filter(
      //   proj => proj.cod_projeto > 1 //Safegold
      // )
      this.horasSelecionado = 8;
      this.agenda.atendimento = 'Remoto';
      this.agenda.cod_projeto = 1;
    } else if (tipo == 7 || tipo == 4) {
      this.listProjetos();
      //  ADMINISTRATIVO ||  EVENTO
      this.projetos = this.projetos.filter(
        proj => proj.cod_projeto == 1 //Safegold
      )
      this.horasSelecionado = 8;
      this.agenda.atendimento = 'Presencial';
      this.agenda.cod_projeto = 1;
    } else if (tipo == 5 || tipo == 9) {
      // PROSPECÇÂO || CURSO
      this.projetos = [];
      this.horasSelecionado = 8;
      this.agenda.atendimento = 'Presencial';
      this.agenda.cod_projeto = null;
      // fazer um projeto safegold talvez aqui
    } else if (tipo == 2 || tipo == 3) {
      //  FOLGA || FERIADO 
      this.projetos = [];
      this.horasSelecionado = null;
      this.agenda.atendimento = null;
      this.agenda.cod_projeto = null;
    }
  }

  novoProjeto() {
    const modalRef = this.modalService.open(InserirProjetoComponent, { size: 'lg' });
  }
}
