import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth';
import { AgendaService } from '../services/agenda.service';


@Component({
  selector: 'app-agenda-historico',
  templateUrl: './agenda-historico.component.html',
  styleUrls: ['./agenda-historico.component.css']
})
export class AgendaHistoricoComponent implements OnInit {

  agenda!: { data: string, dia: string, unidade: string, area: string, funcao: string, gestor: string, tipo: string, projeto: string, horas: number, atendimento: string }[];
  username!: String;
  diaInicio!: Date;
  diaFim!: Date;
  dataFiltrada!: string;
  semanaSelecionada!: String;

  constructor(private agendaService: AgendaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.listarAgenda();
    this.verSemanaAtual();
  }

  filtrarPorData(ini: Date, fim: Date) {
    this.diaFim = fim;
    this.diaInicio = ini;
  }

  logout() {
    this.authService.logout();
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
    // this.diasSemana.forEach((dia) => {
    //   let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    //   dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
    //   first++; // Incrementa a data
    // });
    // // Remove os cartões da semana que vem e adiciona novos para semana atual
    // this.criarPrimeiroCard();
  }

  verSemanaPassada() {
    // Flag do Botao
    this.semanaSelecionada = 'passada';
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
    // // Loop para alterar as datas dos cards
    // this.diasSemana.forEach((dia) => {
    //   let firstdayCard = new Date(curr.setDate(first)).toUTCString(); // Variavel de data
    //   dia.dia = new Date(firstdayCard); // Atribui o dia no objeto dia para a data
    //   first++; // Incrementa a data
    // });
    // // Remove os cartões da semana atual e adiciona novos para semana que vem
    // this.criarPrimeiroCard();
  }
  listarAgenda() {
    this.agenda = [
      { data: "2023-04-26", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-25", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-24", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-21", dia: "Sexta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-20", dia: "Quinta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-19", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-18", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-17", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-14", dia: "Sexta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "FARIMAX", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-13", dia: "Quinta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-12", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-11", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "AMERICANAS", horas: 8, atendimento: "Remoto" },
      { data: "2023-04-10", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN", horas: 8, atendimento: "Remoto" },
    ];
  }


}