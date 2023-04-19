import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../services/agenda.service';


@Component({
  selector: 'app-agenda-historico',
  templateUrl: './agenda-historico.component.html',
  styleUrls: ['./agenda-historico.component.css']
})
export class AgendaHistoricoComponent implements OnInit {


  ex = new Array(100);
  username!: String;
  diaInicio!: Date;
  diaFim!: Date;
  dataFiltrada!: string;
  
  constructor(private router: Router, private agendaService: AgendaService,) { }

  ngOnInit(): void {
    this.username = 'username'
    this.atribuirSemanaAtual();
  }

  preencherAgenda() {
    this.router.navigate(['agenda']);
    // modalRef.componentInstance.empresa = empresa;
  }

  filtrarPorData(diaInicio: Date, diaFim: Date) {
    const dataInicio = diaInicio.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
    const dataFim = diaFim.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
    console.log('aaa->'+dataInicio);
    this.dataFiltrada = `${dataInicio} - ${dataFim}`;
    console.log(this.dataFiltrada);
    // console.log(this.diaFim);
  }

  atribuirSemanaAtual(){
    this.diaInicio = this.agendaService.getDiaInicio();
    this.diaFim = this.agendaService.getDiaFim();
    const dataInicioa = this.diaInicio.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
    const dataFima = this.diaFim.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
    this.dataFiltrada = `${dataInicioa} - ${dataFima}`;
  }

}
