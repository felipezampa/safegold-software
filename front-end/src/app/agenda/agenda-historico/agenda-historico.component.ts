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
  username!: string;
  // Importante que as datas tenham tipo string minusculo e nao o objeto String senao da erro
  diaInicio!: Date | string;
  diaFim!: Date | string;
  semanaSelecionada!: string;
  mensagemErro: string = '';

  constructor(private agendaService: AgendaService, private authService: AuthService) { }

  ngOnInit(): void {
    // Nome do usuario para mostrar no header do primeiro cartao
    this.username = this.authService.getUsername();
    // Garante que as datas que aparecam sejam as da semana atual
    this.verSemanaAtual();
  }

  listarAgenda(inicio: Date | string, fim: Date | string) {
    // Lista todos os dados da agenda
    this.agendaService.TESTEAGENDA().subscribe(filtro => {
      // Filtro de data, so traz os dados que estao entre a dataInicio e dataFim
      this.agenda = filtro;
      this.agenda.filter(
        // Filtra os dias que estejam entre data inicio e data fim
        (ag: any) =>{
          const format = 'yyyy-MM-dd';
          const locale = 'en-US';
          // Utiliza a formacao 2000-12-30 para facilitar a utilizacao
          const dataFiltrada = formatDate(new Date(ag.data), format, locale);
          dataFiltrada >= inicio && ag.data <= fim
          console.log(ag);  
        }
      )
      console.log(filtro); //u
      // Ordena de forma crescente
      this.agenda.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    });
  }

  logout() {
    this.authService.logout();
  }

  fazerTabelaListrada(isEven: boolean): object {
    // Maneira mais facil que eu encontrei de deixar a tabela listrada
    // As classes CSS / BStrap por algum motivo nao estavam funcionando
    if (isEven) {
      return { 'background-color': '#f2f2f2' };
    } else {
      return {};
    }
  }

  filtrarPorData(ini: Date | string, fim: Date | string) {
    // Limpa a flag dos botões selecionados
    this.semanaSelecionada = '';
    try {
      if (ini > fim) {
        // Teste para ver se o usuario tem QI maior que 50 e nao vai colocar as datas erradas
        throw new Error('Data inicial não pode ser maior que a data final');
      } else if (ini == fim) {
        // Teste para ver se o usuario tem QI maior que 50 e nao vai colocar as datas iguais
        throw new Error('As datas de inicio e fim não podem ser iguais');
      } else {
        // Caso nosso usuario tenha sido inteligente o suficiente chegamos aqui
        this.mensagemErro = '';
        // Atribui os valores dos inputs nos atributos locais
        this.diaFim = fim;
        this.diaInicio = ini;
      }
    } catch (e) {
      //  Mostra a exceção na tela para o usuario
      this.mensagemErro = '<h4 class="alert alert-danger strong">' + e + '</h4>';
    } finally {
      // Faz a chamada do metodo de filtro personalizado
      this.listarAgenda(ini, fim);
    }
  }

  verSemanaAtual() {
    // Flag do Botao
    this.semanaSelecionada = 'atual';
    // Flag caso tenha erros
    this.mensagemErro = '';
    // pega data atual
    let currentDate = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    let first = currentDate.getDate() - currentDate.getDay();
    // Adiciona um dia para pegar segunda-feira
    first++;
    // Pega o ultimo dia da semana (sexta)
    let last = first + 4;
    // Cria objetos date e modifica os atributos
    let firstday = new Date(currentDate.setDate(first)).toUTCString();
    let lastday = new Date(currentDate.setDate(last)).toUTCString();
    // Constantes para formatacao das datas
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    // Utiliza a formacao 2000-12-30 para facilitar a utilizacao
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    // Infelizmente o tipo utilizado so pode ser utilizado como string
    // por isso os atributos sao Date | string
    this.diaInicio = ini;
    this.diaFim = fim;
    // Faz a chamada do metodo de filtro personalizado
    this.listarAgenda(ini, fim);
  }

  verSemanaPassada() {
    // Flag do Botao
    this.semanaSelecionada = 'passada';
    // Flag caso tenha erros
    this.mensagemErro = '';
    // Prepara as datas da semana que vem
    var curr = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    var first = curr.getDate() - curr.getDay() - 7; 
    first++;
    var last = first + 4; 
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.setDate(first)).toUTCString(); 
    let lastday = new Date(curr.setDate(last)).toUTCString();
    // Constantes para formatacao das datas
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    // Utiliza a formacao 2000-12-30 para facilitar a utilizacao
    const ini = formatDate(new Date(firstday), format, locale);
    const fim = formatDate(new Date(lastday), format, locale);
    // Infelizmente o tipo utilizado so pode ser utilizado como string
    // por isso os atributos sao Date | string
    this.diaInicio = ini;
    this.diaFim = fim;
    // Faz a chamada do metodo de filtro personalizado
    this.listarAgenda(ini, fim);
  }
}