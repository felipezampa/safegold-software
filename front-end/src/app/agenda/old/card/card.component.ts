import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'sg-compromisso-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Output() adicionarCardEvent = new EventEmitter<any>();
  @Output() salvarCardEvent = new EventEmitter<any>();
  @Output() excluirCardEvent = new EventEmitter<any>();
  @ViewChild('formAgenda') formAgenda!: NgForm;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: Projeto | null;
  atendimentoSelecionado!: String;
  horasSelecionado!: number;
  tipoSelecionado!: TipoAgenda | undefined;
  @Input() cardData!: Agenda;

  constructor(private projetoService: ProjetoService, private agendaService: AgendaService) { }

  ngOnInit(): void {
    console.log(this.cardData.projeto);
    this.tipoSelecionado = this.cardData.tipo;

    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];

    this.projetoSelecionado = null;
    this.atendimentoSelecionado = this.cardData.atendimento;
    this.horasSelecionado = this.cardData.horas;
  }

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

  listTipo() {
    this.agendaService.listTipo().subscribe({
      next: (tipo: any[]) => {
        if (tipo == null) {
          this.tipoAgenda = [];
        } else {
          console.log(tipo);

          this.tipoAgenda = tipo
        }
      }
    });
  }

  adicionar() {
    this.adicionarCardEvent.emit();
  }

  salvar() {
    console.log(this.formAgenda.value);
    console.log(this.tipoSelecionado?.id_tipo);

    let idProjeto = this.formAgenda.value.cod_projeto;
    if (idProjeto != null) {
      this.projetoService.buscarProjeto(idProjeto).subscribe({
        next: (proj: any) => {
          let projeto = proj.projeto
          var formValues = {
            ...this.formAgenda.value,
            projeto
          };
          this.salvarCardEvent.emit(formValues);
        }
      });
    } else{
      SwalFacade.alerta("Não foi possível salvar", "Selecione um projeto!");
    }
  }

  excluir() {
    this.excluirCardEvent.emit();
  }
}
