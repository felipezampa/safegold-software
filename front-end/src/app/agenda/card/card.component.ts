import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Projeto } from 'src/app/shared';

@Component({
    selector: 'sg-compromisso-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() compromisso: any;
    @Input() atendimento: any;
    novoCompromisso!: { tipo: String, projeto: String, atendimento: String };
    projetos!: Projeto[];
    tipoAgenda!: String[];
    horas!: number[];
    constructor(private http: HttpClient, private projetoService: ProjetoService) { }

    ngOnInit(): void {
        this.listProjetos();
        this.tipoAgenda = ['Projeto', 'Administrativo', 'Curso', 'Evento', 'Feriado'];
        this.horas = [1,2,3,4,5,6,7,8];
    }

    atualizarCompromisso() {
        this.http.put('/api/compromissos/' + this.compromisso.id, this.compromisso).subscribe();
    }

    listProjetos() {
        this.projetoService.listProjetos().subscribe({
            next: (data: Projeto[]) => {
                if (data == null) {
                    this.projetos = [];
                } else {                    
                    this.projetos = data;
                    console.log(this.projetos);
                    // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
                    this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
                }
            },
        });
        console.log(this.projetos);
    }


    // TESTE
    @Output() adicionarCardEvent = new EventEmitter<any>();
    @Output() salvarCardEvent = new EventEmitter<any>();
    @Output() excluirCardEvent = new EventEmitter<any>();

    adicionar() {
      this.adicionarCardEvent.emit();
    }
    
    salvar() {
        this.salvarCardEvent.emit();
    }
    excluir(){
        this.excluirCardEvent.emit();
    }
}
