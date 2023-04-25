import { Component, EventEmitter, Output } from '@angular/core';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Projeto } from 'src/app/shared';

@Component({
    selector: 'sg-compromisso-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {

    @Output() adicionarCardEvent = new EventEmitter<any>();
    @Output() salvarCardEvent = new EventEmitter<any>();
    @Output() excluirCardEvent = new EventEmitter<any>();
    // IndexCartão
    projetos!: Projeto[];
    tipoAgenda!: String[];
    horas!: number[];
    projetoSelecionado!: Projeto | String;
    atendimentoSelecionado!: String;
    horasSelecionado!: Number;
    constructor(private projetoService: ProjetoService) { }

    ngOnInit(): void {
        this.projetoSelecionado = '';
        this.atendimentoSelecionado = 'Presencial';
        this.horasSelecionado = 8;
        this.listProjetos();
        this.tipoAgenda = ['Projeto', 'Administrativo', 'Curso', 'Evento', 'Feriado'];
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
        this.salvarCardEvent.emit();
    }
    excluir() {
        this.excluirCardEvent.emit();
    }
}
