import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  diasSemana: { nome: String, dia: String }[] = [
    { nome: 'Segunda-Feira', dia: '17/04' },
    { nome: 'Terça-Feira', dia: '17/04' },
    { nome: 'Quarta-Feira', dia: '17/04' },
    { nome: 'Quinta-Feira', dia: '17/04' },
    { nome: 'Sexta-Feira', dia: '17/04' }
  ];
  TipoAgenda: String[] = ['Projeto', 'Administrativo', 'Curso', 'Evento', 'Feriado'];
  // Projeto: []


  //data  diaDaSemana  unidadeNegocio   area    funcao    gestor    tipo    projeto   horas   atendimento
  //07/09   quinta      perfom/capi                                  projeto/admi     nancy     8     remoto/presencial
}
