import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventEmitter, Output } from '@angular/core';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Agenda, Projeto, SwalFacade, TipoAgenda } from 'src/app/shared';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {
  @ViewChild('formAgenda') formAgenda!: NgForm;
  @Input() agenda!: Agenda;
  @Input() editMode!: boolean;

  projetos!: Projeto[];
  tipoAgenda!: TipoAgenda[];
  horas!: number[];

  projetoSelecionado!: Projeto | null;
  atendimentoSelecionado!: String;
  horasSelecionado!: number;
  // tipoSelecionado!: TipoAgenda | undefined;
  // dataSelecionada!: Date;
  // @Input() cardData!: Agenda;
  constructor(public activeModal: NgbActiveModal, private agendaService: AgendaService, private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.listProjetos();
    this.atualizarAgenda();
    this.horas = [1, 2, 3, 4, 5, 6, 7, 8];
    // console.log(this.cardData.projeto);
    // this.tipoSelecionado = this.cardData.tipo;


    // this.listTipo();


    // this.projetoSelecionado = null;
    // this.atendimentoSelecionado = this.cardData.atendimento;
    // this.horasSelecionado = this.cardData.horas;
  }

  salvar() {
    console.log(this.formAgenda.value);
    SwalFacade.sucesso("Agenda Salva com sucesso!!");
    this.activeModal.close();
  }
  excluir() { 
    SwalFacade.alerta("Ainda não implentei hehe");
    this.activeModal.close();
  }

  listProjetos() {
    this.projetoService.listProjetos().subscribe({
      next: (data: Projeto[]) => {
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

  listTipo() {
    this.agendaService.listTipo().subscribe({
      next: (tipo: any[]) => {
        if (tipo == null) {
          this.tipoAgenda = [];
        } else {
          console.log(tipo);

          this.tipoAgenda = tipo
        }
      }
    });
  }

  atualizarAgenda() {
    console.log(this.agenda);console.log(this.agenda?.horas);console.log(this.agenda?.atendimento);
    
    // Verifica se a flag de edicao eh verdadeira, ou seja se o action eh edicao e nao cadastro
    if (this.editMode == true) {
      // Testa se o id da empresa existe
      if (this.agenda.horas !== undefined) {
        this.formAgenda.setValue({
          // O observable retorna um array, entao eh preciso acessar a posicao [0] para nao vir valores como undefined
          projeto: this.agenda?.projeto,
          horas: this.agenda?.horas,
          atendimento: this.agenda?.atendimento
        });
        // // Busca o objeto empresa com o ID passado
        // this.empresaService.buscarEmpresaPorId(this.idEmpresa).subscribe(empresa => {
        //   // Coloca os valores encontrados no objeto nos campos do form
        //   this.formEmpresas.setValue({
        //     // O observable retorna um array, entao eh preciso acessar a posicao [0] para nao vir valores como undefined
        //     cnpj: empresa[0].cnpj,
        //     empresa: empresa[0].empresa,
        //     cod_projeto: empresa[0].cod_projeto,
        //     safegold_ger: empresa[0].safegold_ger
        //   });
        // });
      } else {
        // Caso não encontrado então levanta uma excecão
        SwalFacade.erro("Agenda não encontrada");
      }
    }
  }
}

