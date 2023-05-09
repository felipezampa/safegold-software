import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/shared';
import * as XLSX from 'xlsx';
import { EmpresaService, ExcluirEmpresaComponent, InserirEditarEmpresaComponent, ModalEmpresaComponent } from '../index';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})

export class ListarEmpresaComponent implements OnInit {

  empresas: Empresa[] = [];
  isLoading: boolean = false;
  editMode: boolean = false;
  subscription: Subscription | undefined;
  safegoldGerencia: number | undefined = 0;
  filtroEmpresa!: string;
  filtroProjeto!: string;
  filtroTodos: boolean = true;

  constructor(private empresaService: EmpresaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarEmpresa();
    this.subscription = this.empresaService.refreshPage$.subscribe(() => {
      this.listarEmpresa();
    })
  }

  listarEmpresa() {
    this.isLoading = true;
    this.empresaService.listEmpresas()
      .subscribe(empresas => {
        this.isLoading = false;
        this.empresas = empresas;
      });
  }

  abrirFormCadastro() {
    // Abre o formulario para cadastrar com a flag de edicao falsa
    this.editMode = false;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.editMode = this.editMode;
  }

  abrirFormAtualizacao(id: number) {
    // Abre o formulario para cadastrar com a flag de edicao verdadeira
    this.editMode = true;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl' });
    // Adicionar o ID do objeto a ser editado
    modalRef.componentInstance.idEmpresa = id;
    modalRef.componentInstance.editMode = this.editMode;
  }

  verModalEmpresa(empresa: Empresa) {
    // Modal simples para visualizacao
    const modalRef = this.modalService.open(ModalEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.empresa = empresa;
  }

  deletarModalEmpresa(empresa: Empresa) {
    // Modal para deletar passando o objeto como parametro
    const modalRef = this.modalService.open(ExcluirEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.empresa = empresa;
  }

  salvarPDF(tableData: Array<Empresa>) {
    // Garante que o jsPDF foi importado e instancia um objeto novo
    const { jsPDF } = require("jspdf");
    const pdf = new jsPDF();
    const now = new Date();
    // Variavéis para o relatorio
    const columns = ['ID', 'Empresa', 'Projeto', 'Safegold', 'CNPJ'];
    const rows = tableData.map(data => [data.cod_empresa, data.empresa, data.projeto, data.safegold_ger, data.cnpj]);
    // Criação do relatório
    pdf.setFontSize(20).setFont(undefined, 'bold');
    pdf.setbo
    pdf.text('Relatório de Empresas', 15, 20);
    pdf.setFontSize(10).setFont(undefined, 'normal');
    pdf.text('Relatório Feito em:  ' + now.toLocaleString(), 15, 26);
    pdf.autoTable({
      head: [columns],
      body: rows,
      theme: 'plain',
      startY: 35,
    });
    pdf.save("RelatorioEmpresas.pdf");
  }

  salvarExcel(tableData: Array<Empresa>) {
    const columns = ['ID', 'Empresa', 'Projeto', 'Safegold', 'CNPJ'];
    const rows = tableData.map(data => [data.cod_empresa, data.empresa, data.projeto, data.safegold_ger, data.cnpj]);

    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, "RelatorioEmpresas.xlsx");
  }

  filtrarEmpresa() {
    // Esvazia o array
    this.empresas = [];
    // Flag de carregamento
    this.isLoading = true;
    this.filtroTodos = false;
    if (this.filtroEmpresa != '') {
      this.empresaService.listEmpresas()
        .subscribe(filtroEmpresa => {
          this.empresas = filtroEmpresa.filter(
            // Compara filtro com o array tudo em lowercase
            emp => emp.empresa.toLowerCase().includes(this.filtroEmpresa.toLowerCase())
          );
          // Ordena por nome crescente
          this.empresas.sort((a, b) => (a.empresa ?? '').localeCompare(b.empresa ?? ''))
          this.isLoading = false;
        });
    } else {
      this.listarEmpresa();
    }
  }

  filtrarProjeto() {
    // Esvazia o array
    this.empresas = [];
    // Flag de carregamento
    this.isLoading = true;
    this.filtroTodos = false;
    if (this.filtroProjeto != '') {
      this.empresaService.listEmpresas()
        .subscribe(filtro => {
          this.empresas = filtro.filter(
            // Compara filtro com o array tudo em lowercase
            proj => proj.projeto.toLowerCase().includes(this.filtroProjeto.toLowerCase())
          );
          // Ordena por nome crescente
          this.empresas.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''))
          this.isLoading = false;
        });
    } else {
      this.listarEmpresa();
    }
  }

  filtrarTodos() {
    this.filtroProjeto = '';
    this.filtroEmpresa = '';
    // Esvazia o array das matrizes
    this.empresas = [];
    // Flag de carregamento
    this.isLoading = true;
    // Flag para indicar filtro selecionado
    this.filtroTodos = true;
    // Lista todas as matrizes sem filtro especifico
    this.empresaService.listEmpresas()
      .subscribe(filtro => {
        this.empresas = filtro;
        // Ordena por nome crescente
        this.empresas.sort((a, b) => (a.empresa ?? '').localeCompare(b.empresa ?? ''))
        this.isLoading = false;
      });
  }
}
