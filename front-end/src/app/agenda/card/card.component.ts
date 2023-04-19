import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
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
    constructor(private http: HttpClient, private projetoService: ProjetoService) { }

    ngOnInit(): void {
        this.listProjetos()
    }

    salvar() {
        console.log('deu boa');

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
                    // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
                    this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
                }
            },
        });
        console.log(this.projetos);
    }

}
