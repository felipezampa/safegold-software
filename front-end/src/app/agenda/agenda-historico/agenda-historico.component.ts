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

  filtrarPorData(ini: Date, fim: Date) {
    // Limpa a flag dos botões selecionados
    this.semanaSelecionada = '';
    try {
      if (ini > fim) {
        throw new Error('Data inicial não pode ser maior que a data final');
      } else if (ini == fim) {
        throw new Error('As datas de inicio e fim não podem ser iguais');
      } else {
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

  verSemanaAtual() {
    // Flag do Botao
    this.semanaSelecionada = 'atual';
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

    console.log(firstday);
    console.log(lastday);
    console.log('---------------------');
    // const date = new Date(); // Use sua própria variável 'date' ou 'this.diaFim'

    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona o zero à esquerda se necessário
    // const day = String(date .getDate()).padStart(2, '0'); // Adiciona o zero à esquerda se necessário

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    // console.log(formattedDate); // Output: "2023-05-26"

    this.filtrarAgenda(ini, fim);
  }
  verSemanaPassada() {
    // Flag do Botao
    this.semanaSelecionada = 'passada';
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
    // Loop para alterar as datas dos cards
    // this.diasSemana.forEach((dia) => {
    //   let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    //   dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
    //   first++; // Incrementa a data
    // });
    // // Remove os cartões da semana que vem e adiciona novos para semana atual
    // this.criarPrimeiroCard();
    // this.filtrarAgenda();
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
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
    this.diaInicio = new Date(firstday); // Converte para o atributo da classe
    this.diaFim = new Date(lastday); // Converte para o atributo da classe
    // // Loop para alterar as datas dos cards
    // this.diasSemana.forEach((dia) => {
    //   let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    //   dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
    //   first++; // Incrementa a data
    // });
    // // Remove os cartões da semana atual e adiciona novos para semana que vem
    // this.criarPrimeiroCard();

    // );
    // this.matrizService.listMatrizAnalitica()
    // .subscribe(filtro => {
    //   this.matrizAnalitica = filtro.filter(
    //     // Compara filtro com o array tudo em lowercase
    //     matriz => matriz.desc_fornecedor.toLowerCase().includes(this.filtroNome.toLowerCase())
    //   );
    //   // Ordena por nome crescente
    //   this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''))
    //   this.isLoading = false;
    // });
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
}