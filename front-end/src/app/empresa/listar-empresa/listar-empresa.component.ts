import { ExcluirEmpresaComponent, ModalEmpresaComponent, InserirEditarEmpresaComponent, EmpresaService } from '../index';
import { Empresa } from 'src/app/shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})


export class ListarEmpresaComponent implements OnInit {

  @ViewChild('formEmpresa') formEmpresa!: NgForm;
  empresas: Empresa[] = [];

  isLoading: boolean = false;
  editMode: boolean = false;
  currentEmpresaId?: number;
  subscription: Subscription | undefined;
  safegoldGerencia: number | undefined = 0;

  constructor(
    private empresaService: EmpresaService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarEmpresa();

    this.subscription = this.empresaService.refreshPage$.subscribe(() => {
      this.listarEmpresa();
    })
  }

  abrirFormCadastro() {
    this.editMode = false;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.editMode = this.editMode;
  }

  listarEmpresa() {
    this.isLoading = true;
    this.empresaService.listEmpresas()
      .subscribe(empresas => {
        this.isLoading = false;
        this.empresas = empresas;
      });
  }

  verModalEmpresa(empresa: Empresa) {
    const modalRef = this.modalService.open(ModalEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.empresa = empresa;
  }

  abrirFormAtualizacao(id: number) {
    this.editMode = true;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.idEmpresa = id;
    // modalRef.componentInstance.empresas = this.empresas;
    modalRef.componentInstance.editMode = this.editMode;
  }

  deletarModalEmpresa(empresa: Empresa) {
    const modalRef = this.modalService.open(ExcluirEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.empresa = empresa;
  }

  editarTodos() {
    alert('Funcionalidade ainda não implementada');
  }

  salvarPDF() {
    window.print();
  }

  salvarCSV() {
    alert('Funcionalidade ainda não implementada');
  }
}
