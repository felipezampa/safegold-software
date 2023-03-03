import { ExcluirEmpresaComponent, ModalEmpresaComponent, InserirEditarEmpresaComponent, EmpresaService } from '../index';
import { Empresa } from 'src/app/shared';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
  filtro: '';

  constructor(
    private empresaService: EmpresaService,
    private modalService: NgbModal) { }

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
    this.editMode = false;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.editMode = this.editMode;
  }

  abrirFormAtualizacao(id: number) {
    this.editMode = true;
    const modalRef = this.modalService.open(InserirEditarEmpresaComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.idEmpresa = id;
    modalRef.componentInstance.editMode = this.editMode;
  }

  verModalEmpresa(empresa: Empresa) {
    const modalRef = this.modalService.open(ModalEmpresaComponent, { size: 'xl' });
    modalRef.componentInstance.empresa = empresa;
  }

  deletarModalEmpresa(empresa: Empresa) {
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

}
