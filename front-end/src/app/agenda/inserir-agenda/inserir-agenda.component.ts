import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth';
import Swal from 'sweetalert2';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  diasSemana: { index: number, nome: String, dia: String, cards: any[] }[] = [
    { index: 0, nome: 'Segunda', dia: '17/04', cards: [] },
    { index: 1, nome: 'Terça', dia: '18/04', cards: [] },
    { index: 2, nome: 'Quarta', dia: '19/04', cards: [] },
    { index: 3, nome: 'Quinta', dia: '20/04', cards: [] },
    { index: 4, nome: 'Sexta', dia: '21/04', cards: [] }
  ];
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  username!: String;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.criarPrimeiroCard()
  }

  criarPrimeiroCard() {
    for (let index = 0; index < this.diasSemana.length; index++) {
      this.adicionarCard(index);
    }
  }

  logout() {
    this.authService.logout();
  }

  adicionarCard(indexDia: number) {
    const novoCard = {};
    this.diasSemana[indexDia].cards.push(novoCard);
  }

  salvarCard(indexDia: number, indexCard: number) {
    this.agendaService.saveAgenda();
  }

  excluirCard(indexDia: number, indexCard: number) {
    if (this.diasSemana[indexDia].cards.length > 1) {
      this.diasSemana[indexDia].cards.splice(indexCard, 1);
      this.agendaService.excluirAgenda();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Não foi possível excluir',
        text: 'O dia deve ter ao menos um compromisso!',
        confirmButtonColor: '#EDA900',
        confirmButtonText: 'Ok'
      });
    }
  }
}
