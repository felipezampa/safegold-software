import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { Agenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-agenda-historico',
  templateUrl: './agenda-historico.component.html',
  styleUrls: ['./agenda-historico.component.css']
})
export class AgendaHistoricoComponent implements OnInit {

  agenda!: Agenda[];
  username!: String;
  diaInicio!: Date;
  diaFim!: Date;
  dataFiltrada!: string;
  semanaSelecionada!: String;
  mensagemErro: string = '';

  constructor(private agendaService: AgendaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.listarAgenda();
    this.verSemanaAtual();
  }

  filtrarAgenda(inicio: Date | String, fim: Date | String) {
    // Lista todos os dados da agenda
    this.agendaService.listAgendaHistorico().subscribe(filtro => {
      // Filtro de data, so traz os dados que estao entre a dataInicio e dataFim
      this.agenda = filtro.filter(
        (ag: any) => ag.data >= inicio && ag.data <= fim
      );
    });
  }

  logout() {
    this.authService.logout();
  }

  filtrarPorData(ini: Date, fim: Date) {
    // Limpa a flag dos botões selecionados
    this.semanaSelecionada = '';
    try {
      if (ini > fim) {
        throw new Error('Data inicial não pode ser maior que a data final');
      } else if (ini == fim) {
        throw new Error('As datas de inicio e fim não podem ser iguais');
      } else {
        this.mensagemErro = '';
        // Atribui os valores dos inputs nos atributos locais
        this.diaFim = fim;
        this.diaInicio = ini;
      }
    } catch (e) {
      //Mostra a exceção na tela
      this.mensagemErro = '<h4 class="alert alert-danger strong">' + e + '</h4>';
    } finally {
      // Faz a chamada do metodo de filtro personalizado
      this.filtrarAgenda(ini, fim);
    }

  }

  verSemanaAtual() {
    // Flag do Botao
    this.semanaSelecionada = 'atual';
    // Flag caso tenha erros
    this.mensagemErro = '';
    // pega data atual
    var curr = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    var first = curr.getDate() - curr.getDay();
    // Adiciona um dia para pegar segunda-feira
    first++;
    // Pega o ultimo dia da semana (sexta)
    var last = first + 4;
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.setDate(first)).toUTCString();
    let lastday = new Date(curr.setDate(last)).toUTCString();
    // Converte para os atributos da classe
    this.diaInicio = new Date(firstday);
    this.diaFim = new Date(lastday);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    this.filtrarAgenda(ini, fim);
  }

  verSemanaPassada() {
    // Flag do Botao
    this.semanaSelecionada = 'passada';
    // Flag caso tenha erros
    this.mensagemErro = '';
    // Prepara as datas da semana que vem
    var curr = new Date; // pega data atual
    var first = curr.getDate() - curr.getDay() - 7; // Primeiro eh o dia do mes - o dia da semana
    first++; // Adiciona um dia para pegar segunda-feira
    var last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    let lastday = new Date(curr.setDate(last)).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    this.filtrarAgenda(ini, fim);
  }

  verProximaSemana() {
    // Flag do Botao
    this.semanaSelecionada = 'proxima';
    // Flag caso tenha erros
    this.mensagemErro = '';
    // Prepara as datas da semana que vem
    let curr = new Date; // pega data atual
    let first = curr.getDate() - curr.getDay(); // Primeiro eh o dia do mes - o dia da semana
    first += 8; // Adiciona uma semana para a frente
    let last = first + 4; // Pega o ultimo dia da semana (sexta)
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    this.filtrarAgenda(ini, fim);
  }
  listarAgenda() {
    this.agendaService.listAgendaHistorico().subscribe({
      next: agenda => {
        console.log(agenda);
        this.agenda = agenda;
        console.log(this.agenda);
      }
    });

  }
  fazerTabelaListrada(isEven: boolean): object {
    if (isEven) {
      return { 'background-color': '#f2f2f2' };
    } else {
      return {};
    }
  }
}