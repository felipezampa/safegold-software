import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { FuncaoGestor, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';


@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  @ViewChild('formAgenda') formAgenda!: NgForm;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: Projeto | null;
  atendimentoSelecionado!: String;
  horasSelecionado!: number;
  tipoSelecionado!: TipoAgenda | undefined;
  dataSelecionada!: Date;

  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.listProjetos();
    this.listTipo();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    this.atendimentoSelecionado = 'Remoto';
    this.projetoSelecionado = null;
    this.horasSelecionado = 8;
    this.tipoSelecionado = {id_tipo: 10, tipo: 'Projeto'};
  }

  /**  
  * @description 
  * Metodo simples que recebe um dia e retorna qual dia da semana esse é
  * Exemplo: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'
  * 
  * @param data uma data comum no formato yyyy-mm-dd 
  * 
  * @returns Retorna uma string do dia 'Quarta-Feira'
  */
  salvar() {
    let formValues: any;
    const dt: Date = new Date(this.formAgenda.value.data);
    var dia = this.agendaService.obterDia(dt);
    const idGestor = this.authService.getCurrentUser();
    console.log(this.formAgenda.value);
    
    if (this.formAgenda.value.data == null) {
      SwalFacade.alerta("Não foi possível salvar", "Selecione uma data!");
    } else{
    // else if (this.formAgenda.value.tipo.id_tipo == 10) {
      forkJoin([
        this.projetoService.buscarProjeto(this.formAgenda.value.cod_projeto),
        this.agendaService.getFuncaoGestor(idGestor)
      ]).subscribe({
        next: (results: [any, FuncaoGestor[]]) => {
          let projeto = results[0].projeto;
          let funcao_gestor = results[1][0];
          formValues = {
            ...this.formAgenda.value, funcao_gestor, projeto, dia
          };
          this.agendaService.salvarAgenda(formValues).subscribe();
          SwalFacade.sucesso("Agenda salva com sucesso!");
          this.activeModal.close();
          console.log(formValues);
        },
        error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
      });
    } 
    // else {
    //   this.agendaService.getFuncaoGestor(idGestor).subscribe({
    //     next: (results: any) => {
    //       let funcao_gestor = results;
    //       let projeto = 'Feriado'
    //       formValues = {
    //         ...this.formAgenda.value, funcao_gestor, projeto, dia,
    //       };
    //     },
    //     error: () => SwalFacade.erro("Erro ao salvar", "Se o erro persistir entre em contato com o administrador!")
    //   });
    // }
  }

  /**
   * @description Lista todos os projeto para selecionar como opção na tag select input
   */
  listProjetos() {
    this.projetoService.listProjetos().subscribe({
      next: (data: Projeto[]) => {
        console.log(data);
        
        if (data == null) {
          this.projetos = [];
        } else {
          this.projetos = data;
          // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
          this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
        }
      },
    });
  }

  /**
   * @description Lista todos os tipos de agenda para selecionar como opção na tag select input
   */
  listTipo() {
    this.agendaService.listTipo().subscribe({
      next: (tipo: any[]) => {
        if (tipo == null) {
          this.tipoAgenda = [];
        } else {
          this.tipoAgenda = tipo;
          this.tipoAgenda.sort((a, b) => (a.tipo ?? '').localeCompare(b.tipo ?? ''));
        }
      }
    });
  }
}
