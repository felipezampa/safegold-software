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
  diasSemana: { index: number, nome: String, dia: Date, cards: any[] }[] = [
    { index: 0, nome: 'Segunda', dia: new Date('2023-04-17'), cards: [] },
    { index: 1, nome: 'Terça', dia: new Date('2023-04-18'), cards: [] },
    { index: 2, nome: 'Quarta', dia: new Date('2023-04-19'), cards: [] },
    { index: 3, nome: 'Quinta', dia: new Date('2023-04-20'), cards: [] },
    { index: 4, nome: 'Sexta', dia: new Date('2023-04-21'), cards: [] }
  ];
  @ViewChild('card') card!: CardComponent;
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  username!: String;
  semanaSelecionada: string = 'proxima';

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

  verSemanaAtual() {
    // Flag do Botao
    this.semanaSelecionada = 'atual';
    // Prepara as datas da semana que vem
    var curr = new Date; // pega data atual
    var first = curr.getDate() - curr.getDay(); // Primeiro eh o dia do mes - o dia da semana
    first++; // Adiciona um dia para pegar segunda-feira
    var last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    let lastday = new Date(curr.setDate(last)).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    // Loop para alterar as datas dos cards
    this.diasSemana.forEach((dia) => {
      let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
      dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
      first++; // Incrementa a data
    });
  }

  verProximaSemana() {
    // Flag do Botao
    this.semanaSelecionada = 'proxima';
    // Prepara as datas da semana que vem
    let curr = new Date; // pega data atual
    let first = curr.getDate() - curr.getDay(); // Primeiro eh o dia do mes - o dia da semana
    first += 8; // Adiciona uma semana para a frente
    let last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    let lastday = new Date(curr.setDate(last)).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    // Loop para alterar as datas dos cards
    this.diasSemana.forEach((dia) => {
      let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
      dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
      first++; // Incrementa a data
    });
  }
}