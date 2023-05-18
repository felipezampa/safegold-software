import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { DiaSemana, SwalFacade } from 'src/app/shared';
import { CardComponent } from '../card/card.component';
import { AgendaService } from '../services/agenda.service';
import { FormGroup } from '@angular/forms';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  diasSemana: DiaSemana[] = [
    { index: 0, nome: 'Segunda', dia: new Date('2023-04-17'), cards: [] },
    { index: 1, nome: 'Terça', dia: new Date('2023-04-18'), cards: [] },
    { index: 2, nome: 'Quarta', dia: new Date('2023-04-19'), cards: [] },
    { index: 3, nome: 'Quinta', dia: new Date('2023-04-20'), cards: [] },
    { index: 4, nome: 'Sexta', dia: new Date('2023-04-21'), cards: [] }
  ];
  @ViewChild('card') card!: CardComponent;
  diaInicio!: Date;
  diaFim!: Date;
  username!: String;
  semanaSelecionada!: String;

  constructor(private authService: AuthService, private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.criarPrimeiroCard();
    this.verSemanaAtual();
  }

  criarPrimeiroCard() {
    // Permite iniciar a agenda com um card para cada dia
    for (let index = 0; index < this.diasSemana.length; index++) {
      // Esvazia os cartoes existentes / esquecidos
      this.diasSemana[index].cards = [];
      // Adiciona um em cada dia
      this.adicionarCard(index);
    }
  }

  logout() {
    this.authService.logout();
  }

  adicionarCard(indexDia: number) {
    const novoCard = {};
    if (this.diasSemana[indexDia].cards.length <= 8) {
      this.diasSemana[indexDia].cards.push(novoCard);
    } else {
      SwalFacade.erro("Não foi possível adicionar", "O dia deve não pode ter mais que 8 compromissos!");
    }
  }

  salvarCard(indexDia: number, formulario: FormGroup) {
    if (formulario.value.projetoSelecionado != undefined) {
      const idGestor = this.authService.getCurrentUser();
      this.agendaService.getFuncaoGestor(idGestor).subscribe({
        next: gestor => {
          const novoObjeto = { funcao_gestor: gestor[0] };
          console.log(novoObjeto);
          var objetoCombinado = { ...novoObjeto, ...formulario.value, ...this.obterDia(indexDia) };
          this.agendaService.saveAgenda(objetoCombinado).subscribe();
          // console.log(objetoCombinado);
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
    } else {
      SwalFacade.erro("Não foi possível salvar", "Selecione um projeto!");
    }
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
    // Remove os cartões da semana que vem e adiciona novos para semana atual
    this.criarPrimeiroCard();
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
    // Remove os cartões da semana atual e adiciona novos para semana que vem
    this.criarPrimeiroCard();
  }

  obterDia(numeroDia: number): { dia: string; data: Date } | undefined {
    /* 
     Metodo simples que recebe o numero do card que foi utilizado como parametro
     */
    let dataDia = this.diasSemana[numeroDia].dia
    switch (numeroDia) {
      case 0:
        return { dia: 'Segunda-Feira', data: dataDia };
      case 1:
        return { dia: 'Terça-Feira', data: dataDia };
      case 2:
        return { dia: 'Quarta-Feira', data: dataDia };
      case 3:
        return { dia: 'Quinta-Feira', data: dataDia };
      case 4:
        return { dia: 'Sexta-Feira', data: dataDia };
      default:
        return undefined;
    }
  }
}

