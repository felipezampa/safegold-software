import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { Agenda, FuncaoGestor, SwalFacade } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';
import { CardComponent } from '../card/card.component';
import { Subscription } from 'rxjs';
// import moment from 'moment';
import 'moment/locale/pt-br';
import * as moment from 'moment';

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
  @ViewChild('card') card!: CardComponent;
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  username!: String;
  semanaSelecionada: string = 'atual';
  constructor(private authService: AuthService, private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.criarPrimeiroCard();
  }

  criarPrimeiroCard() {
    // Permite iniciar a agenda com um card para cada dia
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
    const idGestor = this.authService.getCurrentUser();
    this.agendaService.getFuncaoGestor(idGestor).subscribe({
      next: gestor => console.log(gestor)
    });
    // const agenda = new Agenda();
    // agenda. = 
    // const data = this.card.formAgenda != undefined ? this.card.formAgenda.value : '';
    // console.log(indexDia, indexCard, data);

    // this.agendaService.saveAgenda();
  }

  excluirCard(indexDia: number, indexCard: number) {
    if (this.diasSemana[indexDia].cards.length > 1) {
      this.diasSemana[indexDia].cards.splice(indexCard, 1);
      this.agendaService.excluirAgenda();
    } else {
      SwalFacade.erro("Não foi possível excluir", "O dia deve ter ao menos um compromisso!");
    }
  }
  // getCurrentWeekDays(): Date[] {
  getCurrentWeekDays() {
    this.semanaSelecionada = 'atual';
    // const now = new Date();
    // const dayOfWeek = now.getDay();
    // const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    // const monday = new Date(now.setDate(diff));
    // const friday = new Date(now.setDate(diff + 4));
    // console.log('seg-> ' + monday);
    // console.log('ter-> ' + new Date(monday.getTime() + 24 * 60 * 60 * 1000));
    // console.log('qua-> ' + new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000));
    // console.log('qui-> ' + new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000));
    // console.log('sex-> ' + friday);
    // return [monday, new Date(monday.getTime() + 24 * 60 * 60 * 1000), new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000), new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000), friday];
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));

    const weekdays = [
      'SEGUNDA',
      'TERÇA',
      'QUARTA',
      'QUINTA',
      'SEXTA'
    ];
    const weekDaysFormatted = weekdays.map((day, index) => {
      const date = index === 4 ? new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000) : new Date(monday.getTime() + index * 24 * 60 * 60 * 1000);
      const formattedDate = moment(date).locale('pt-br').format('DD/MM/YYYY');
      const [dia, data, ano] = `${day} ${formattedDate}`.split(' ');
      return { dia, data };
    });
    this.diaInicio = new Date(Object.values(weekDaysFormatted)[0].data);
    this.diaFim = new Date(Object.values(weekDaysFormatted)[4].data);
    console.log( new Date(Object.values(weekDaysFormatted)[0].data));
    console.log( new Date(Object.values(weekDaysFormatted)[4].data));
    console.log(weekDaysFormatted);
  }

  // getNextWeekDays(): Date[] {
  getNextWeekDays() {
    this.semanaSelecionada = 'proxima';
    // const now = new Date();
    // now.setDate(now.getDate() + 7); // adicionar uma semana
    // const dayOfWeek = now.getDay();
    // const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    // const monday = new Date(now.setDate(diff));
    // const friday = new Date(now.setDate(diff + 4));
    // return [monday, new Date(monday.getTime() + 24 * 60 * 60 * 1000), new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000), new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000), friday];
    const now = new Date();
    now.setDate(now.getDate() + 7);
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));

    const weekdays = [
      'SEGUNDA',
      'TERÇA',
      'QUARTA',
      'QUINTA',
      'SEXTA'
    ];
    const weekDaysFormatted = weekdays.map((day, index) => {
      const date = index === 4 ? new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000) : new Date(monday.getTime() + index * 24 * 60 * 60 * 1000);
      const formattedDate = moment(date).locale('pt-br').format('DD/MM/YYYY');
      const [dia, data, ano] = `${day} ${formattedDate}`.split(' ');
      return { dia, data };
    });

    console.log(weekDaysFormatted);

  }
}
