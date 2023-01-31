import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from '../services/projeto.service';
import { Projeto } from 'src/app/shared';

@Component({
  selector: 'app-listar-projeto',
  templateUrl: './listar-projeto.component.html',
  styleUrls: ['./listar-projeto.component.css']
})
export class ListarProjetoComponent implements OnInit {

  @ViewChild('formProjeto') formEmpresa!: NgForm;

  projetos: Projeto[] = [];
  isLoading: boolean = false;
  editMode: boolean = false;
  currentProjetoId?: number;
  subscription: Subscription | undefined;
  safegoldGerencia: number | undefined = 0;

  constructor(
    private projetoService: ProjetoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listarProjeto();

    this.subscription = this.projetoService.refreshPage$.subscribe(() => {
      this.listarProjeto();
    })
  }

  SalvarForm(postData: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }) {
    alert('Funcionalidade ainda não implementada');
  }

  abrirFormProjeto(projeto?: Projeto) {

    alert('Funcionalidade ainda não implementada');
  };
  verModalProjeto(projeto: Projeto) {
    alert('Funcionalidade ainda não implementada');
  }
  editarTodos() {
    alert('Funcionalidade ainda não implementada');
  }
  salvarPDF() {
    alert('Funcionalidade ainda não implementada');
  }
  salvarCSV() {
    alert('Funcionalidade ainda não implementada');
  }

  atualizarProjeto(id: number | undefined) {
    alert('Funcionalidade ainda não implementada');
  }

  deletarModalProjeto(projeto: Projeto) {
    alert('Funcionalidade ainda não implementada');
  }


  // ================= OK =============================
  listarProjeto() {
    /**
     * Método de Listar os projetos:
     * Chama o método da service que processa o GET Http
     * Ele retorna um observable, o subscribe tranforsm no objeto projeto
     */
    this.isLoading = true;
    this.projetoService.listProjetos()
      .subscribe(projetos => {
        this.isLoading = false;
        this.projetos = projetos;
      });
  }

}
