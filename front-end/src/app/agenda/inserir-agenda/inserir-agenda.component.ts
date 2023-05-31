import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import 'moment/locale/pt-br';
import { AuthService } from 'src/app/auth';
import { Agenda, DiaSemana, SwalFacade, TipoAgenda } from 'src/app/shared';
import { CardComponent } from '../card/card.component';
import { AgendaService } from '../services/agenda.service';

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

  salvarCard(indexDia: number, formulario: { tipo: TipoAgenda, cod_projeto: string, atendimento: string, horas: number, projeto: string }) {
    if (formulario.cod_projeto != undefined) {
      const idGestor = this.authService.getCurrentUser();
      this.agendaService.getFuncaoGestor(idGestor).subscribe({
        next: gestor => {
          const novoObjeto = { funcao_gestor: gestor[0] };
          var objetoCombinado = { ...novoObjeto, ...formulario, ...this.obterDia(indexDia) };
          // this.agendaService.saveAgenda(objetoCombinado).subscribe();
          console.log(objetoCombinado);
          SwalFacade.sucesso( this.obterDia(indexDia)?.data +' - '+ this.obterDia(indexDia)?.dia,'Agenda salva com sucesso!');
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
    let curr = new Date; // pega data atual
    let first = curr.getDate() - curr.getDay(); // Primeiro eh o dia do mes - o dia da semana
    first++; // Adiciona um dia para pegar segunda-feira
    let last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    // Loop para alterar as datas dos cards
    this.diasSemana.forEach((dia, index) => {
      let newDate = new Date(curr.getFullYear(), curr.getMonth(), first + index);
      dia.dia = newDate;
    });
    // Remove os cartões da semana que vem e adiciona novos para semana atual
    this.criarPrimeiroCard();
  }

  verProximaSemana() {
    // Flag do Botao
    this.semanaSelecionada = 'proxima';
    // Prepara as datas da semana que vem
    let curr = new Date(); // pega data atual
    let first = curr.getDate() - curr.getDay(); // Primeiro eh o dia do mes - o dia da semana
    first += 8; // Adiciona uma semana para a frente
    let last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    // Loop para alterar as datas dos cards
    // this.diasSemana.forEach((dia) => {
    //   let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    //   dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
    //   first++; // Incrementa a data
    // });
    this.diasSemana.forEach((dia, index) => {
      let newDate = new Date(curr.getFullYear(), curr.getMonth(), first + index);
      dia.dia = newDate;
    });
    // Remove os cartões da semana atual e adiciona novos para semana que vem
    this.criarPrimeiroCard();
  }

  obterDia(numeroDia: number): { dia: string; data: string } | undefined {
    /* 
     Metodo simples que recebe o numero do card que foi utilizado como parametro
     */
    // Variaveis de formatacao
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    // Obtem a data atraves do cartao do dia
    let dataDia = this.diasSemana[numeroDia].dia
    // Utiliza a formacao 2000-12-30 para facilitar a utilizacao
    const dataFiltrada = formatDate(new Date(dataDia), format, locale);
    switch (numeroDia) {
      case 0:
        return { dia: 'Segunda-Feira', data: dataFiltrada };
      case 1:
        return { dia: 'Terça-Feira', data: dataFiltrada };
      case 2:
        return { dia: 'Quarta-Feira', data: dataFiltrada };
      case 3:
        return { dia: 'Quinta-Feira', data: dataFiltrada };
      case 4:
        return { dia: 'Sexta-Feira', data: dataFiltrada };
      default:
        return undefined;
    }
  }
}

