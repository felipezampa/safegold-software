import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { Agenda, FuncaoGestor, SwalFacade } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';8
import { InserirAgendaComponent, EditarAgendaComponent } from '.././index';

@Component({
  selector: 'app-agenda-historico',
  templateUrl: './agenda-historico.component.html',
  styleUrls: ['./agenda-historico.component.css']
})
export class AgendaHistoricoComponent implements OnInit {

  agenda: Agenda[] = [];
  username!: string;
  // Importante que as datas tenham tipo string minusculo e nao o objeto String senao da erro
  diaInicio!: Date | string;
  diaFim!: Date | string;
  semanaSelecionada!: string;
  usuarioSelecionado!: FuncaoGestor;
  subscription: Subscription | undefined;
  gestores!: FuncaoGestor[];

  constructor(private agendaService: AgendaService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // Nome do usuario para mostrar no header do primeiro cartao
    this.username = this.authService.getUsername();
    const idGestor = this.authService.getCurrentUser();
    this.agendaService.getFuncaoGestor(idGestor).subscribe({
      next: (results: FuncaoGestor) => {
        this.usuarioSelecionado = results
    }})
    // Garante que as datas que aparecam sejam as da semana atual
    this.verSemanaAtual(this.username);
    this.subscription = this.agendaService.refreshPage$.subscribe(() => {
      this.verSemanaAtual(this.username);
    })
    this.listarGestor();
  }
  editarAgenda(ag: Agenda) {
    const modalRef = this.modalService.open(EditarAgendaComponent, { size: 'lg'});
    // Adicionar o ID do objeto a ser editado
    modalRef.componentInstance.idAgenda = ag.id;
    modalRef.componentInstance.editMode = true;
  }

  preencherAgenda(){
    const modalRef = this.modalService.open(InserirAgendaComponent, { size: 'lg'});
    modalRef.componentInstance.editMode = false;
  }

  /**
   * Metodo base para a filtragem dos dados, atraves dele
   * que serao filtradas os dados da agenda de acordo com 
   * a opcao escolhida pelo usuario.
   * 
   * @param inicio A data inicial a ser filtrada.
   * @param fim A data final a ser filtrada.
   *
   */
  listarAgenda(inicio: Date | string, fim: Date | string, username: string) {
    // Converte os parametros para string caso eles venham em texto
    const dataInicio = typeof inicio === 'string' ? new Date(inicio) : inicio;
    const dataFim = typeof fim === 'string' ? new Date(fim) : fim;
    // Lista todos os dados da agenda
    this.agendaService.listarAgenda(username).subscribe(filtro => {
      // Filtro de data, só traz os dados que estão entre a dataInicio e dataFim
      this.agenda = filtro.filter((ag: any) => {
        const data = new Date(ag.data);
        return data >= dataInicio && data <= dataFim;
      });
      // Ordena de forma crescente
      this.agenda.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    });
  }

  listarGestor(){
    this.agendaService.listFuncaoGestor().subscribe({
      next: (gestor: any[]) => {
        if (gestor == null) {
          this.gestores = [];
        } else {
          this.gestores = gestor;
          this.gestores.sort((a, b) => (a.username ?? '').localeCompare(b.username ?? ''));
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  /**
   * Maneira mais facil que eu encontrei de deixar a tabela listrada
   * As classes CSS / BStrap por algum motivo nao estavam funcionando 
   * a opcao escolhida pelo usuario.
   * 
   * @param isEven Testa se a linha é par.
   *
   */
  fazerTabelaListrada(isEven: boolean): object {
    // 
    // 
    if (isEven) {
      return { 'background-color': '#f2f2f2' };
    } else {
      return {};
    }
  }

  filtrarPorData(ini: Date | string, fim: Date | string) {
    // Limpa a flag dos botões selecionados
    this.semanaSelecionada = '';

    if (ini > fim) {
      // Teste para ver se o usuario tem QI maior que 50 e nao vai colocar as datas erradas
      SwalFacade.erro('Erro no filtro', 'Data inicial não pode ser maior que a data final');
    } else if (ini == fim) {
      // Teste para ver se o usuario tem QI maior que 50 e nao vai colocar as datas iguais
      SwalFacade.erro('Erro no filtro', 'As datas de inicio e fim não podem ser iguais');
    } else {
      // Caso nosso usuario tenha sido inteligente o suficiente chegamos aqui
      // Atribui os valores dos inputs nos atributos locais
      this.diaFim = fim;
      this.diaInicio = ini;
     
      
      this.listarAgenda(ini, fim,this.usuarioSelecionado.username);
    }
  }

  verSemanaAtual(username: string) {
    // Flag do Botao
    this.semanaSelecionada = 'atual';
    // Pega data atual
    let currentDate = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    let first = currentDate.getDate() - currentDate.getDay();
    // Adiciona um dia para pegar segunda-feira
    first++;
    // Pega o ultimo dia da semana (sexta)
    let last = first + 4;
    // Cria objetos date e modifica os atributos
    let firstday = new Date(currentDate.getFullYear(), currentDate.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(currentDate.getFullYear(), currentDate.getMonth(), last).toUTCString(); // Variavel de data
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
    this.listarAgenda(ini, fim,username);
  }

  verSemanaPassada(username: string) {
    // Flag do Botao
    this.semanaSelecionada = 'passada';
    // Prepara as datas da semana que vem
    var curr = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    var first = curr.getDate() - curr.getDay() - 7;
    first++;
    var last = first + 4;
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
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
    this.listarAgenda(ini, fim,username);
  }

  verProximaSemana(username: string){
    // Flag do Botao
    this.semanaSelecionada = 'proxima';
    // Prepara as datas da semana que vem
    var curr = new Date;
    // Primeiro eh o dia do mes - o dia da semana
    var first = curr.getDate() - curr.getDay() + 7;
    first++;
    var last = first + 4;
    // Cria objetos date e modifica os atributos
    let firstday = new Date(curr.getFullYear(), curr.getMonth(), first).toUTCString(); // Variavel de data
    let lastday = new Date(curr.getFullYear(), curr.getMonth(), last).toUTCString(); // Variavel de data
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
    this.listarAgenda(ini, fim,username);
  }
}