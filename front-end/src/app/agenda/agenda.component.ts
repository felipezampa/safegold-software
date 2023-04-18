import { Component } from '@angular/core';
import { Projeto } from '../shared';
import { ProjetoService } from '../financeiro/projeto';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  diasSemana: { nome: String, dia: String }[] = [
    { nome: 'Segunda-Feira', dia: '17/04' },
    { nome: 'Terça-Feira', dia: '18/04' },
    { nome: 'Quarta-Feira', dia: '19/04' },
    { nome: 'Quinta-Feira', dia: '20/04' },
    { nome: 'Sexta-Feira', dia: '21/04' }
  ];
  tipoAgenda: String[] = ['Projeto', 'Administrativo', 'Curso', 'Evento', 'Feriado'];
  projetos!: Projeto[];
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  // Projeto: []

  //data  diaDaSemana  unidadeNegocio   area    funcao    gestor    tipo    projeto   horas   atendimento
  //07/09   quinta      perfom/capi                                  projeto/admi     nancy     8     remoto/presencial
  constructor(private projetoService: ProjetoService) {
    this.listProjetos();
  }

  ngOnInit(): void {
    this.listProjetos();
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
  adicionarProjeto() {
  }
}
