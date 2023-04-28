import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from 'src/app/auth';
import { NgForm } from '@angular/forms';


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

  constructor(private router: Router, private agendaService: AgendaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.listarAgenda();
    this.atribuirSemanaAtual();
  }

  preencherAgenda() {
    this.router.navigate(['agenda']);
    // modalRef.componentInstance.empresa = empresa;
  }

  filtrarPorData(ini: Date, fim: Date) {
    this.diaFim = fim;
    this.diaInicio = ini;
  }

  atribuirSemanaAtual() {
    this.diaInicio = this.agendaService.getDiaInicio();
    this.diaFim = this.agendaService.getDiaFim();
  }
  logout() {
    this.authService.logout();
  }

  listarAgenda() {
    this.agenda = [
      { data: "2023-04-26", dia: "Quarta-Feira",  unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA",            horas: 8, atendimento: "Remoto" },
      { data: "2023-04-25", dia: "Terça-Feira",   unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM",      horas: 8, atendimento: "Remoto" },
      { data: "2023-04-24", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM",      horas: 8, atendimento: "Remoto" },
      { data: "2023-04-21", dia: "Sexta-Feira",   unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-20", dia: "Quinta-Feira",  unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-19", dia: "Quarta-Feira",  unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-04-18", dia: "Terça-Feira",   unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA",            horas: 8, atendimento: "Remoto" },
      { data: "2023-04-17", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM",      horas: 8, atendimento: "Remoto" },
      { data: "2023-04-14", dia: "Sexta-Feira",   unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "FARIMAX",         horas: 8, atendimento: "Remoto" },
      { data: "2023-04-13", dia: "Quinta-Feira",  unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN",           horas: 8, atendimento: "Remoto" },
      { data: "2023-04-12", dia: "Quarta-Feira",  unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA",            horas: 8, atendimento: "Remoto" },
      { data: "2023-04-11", dia: "Terça-Feira",   unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "AMERICANAS",      horas: 8, atendimento: "Remoto" },
      { data: "2023-04-10", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN",           horas: 8, atendimento: "Remoto" },
    ];
  }

}