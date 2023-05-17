import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Projeto, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';

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

    projetoSelecionado!: Projeto | String;
    atendimentoSelecionado!: String;
    horasSelecionado!: Number;
    tipoSelecionado!: TipoAgenda;

    constructor(private projetoService: ProjetoService, private agendaService: AgendaService) { }

    ngOnInit(): void {
        this.projetoSelecionado = '';
        this.atendimentoSelecionado = 'Presencial';
        this.tipoSelecionado = { id_tipo: 1, tipo: 'Projeto' };
        this.horasSelecionado = 8;
        this.listProjetos();
        this.agendaService.listTipo().subscribe({
            next: (tipo: any[]) => this.tipoAgenda = tipo
        });
        this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
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

    adicionar() {
        this.adicionarCardEvent.emit();
    }

    salvar() {
        this.salvarCardEvent.emit(this.formAgenda);
    }
    excluir() {
        this.excluirCardEvent.emit();
    }
}
