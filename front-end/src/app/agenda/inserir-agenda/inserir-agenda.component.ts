import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  diasSemana: { index: number, nome: String, dia: String, cards: any[] }[] = [
    { index: 0, nome: 'Segunda-Feira', dia: '17/04', cards:[] },
    { index: 1, nome: 'Terça-Feira', dia: '18/04', cards:[] },
    { index: 2, nome: 'Quarta-Feira', dia: '19/04', cards:[] },
    { index: 3, nome: 'Quinta-Feira', dia: '20/04', cards:[] },
    { index: 4, nome: 'Sexta-Feira', dia: '21/04', cards:[] }
  ];
  tipoAgenda: String[] = ['Projeto', 'Administrativo', 'Curso', 'Evento', 'Feriado'];
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  username!: String;

  constructor(private router: Router, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.username = 'username'
    this.criarPrimeiroCard()
  }


  verModalAgenda() {
    this.router.navigate(['historico'], { relativeTo: this.route });
    // modalRef.componentInstance.empresa = empresa;
  }

  criarPrimeiroCard(){
    for (let index = 0; index < this.diasSemana.length; index++) {
      this.adicionarProjeto(index);  
    }
  }
  adicionarProjeto(dia: number) {
    this.diasSemana[dia].cards.push({});
  }
}
