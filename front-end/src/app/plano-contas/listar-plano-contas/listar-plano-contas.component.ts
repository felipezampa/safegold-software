import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PlanoContas } from 'src/app/shared';
import { InserirEditarPlanoContasComponent } from '../inserir-editar-plano-contas/inserir-editar-plano-contas.component';
import { PlanoContasService } from '../services/plano-contas.service';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listar-plano-contas',
  templateUrl: './listar-plano-contas.component.html',
  styleUrls: ['./listar-plano-contas.component.css']
})
export class ListarPlanoContasComponent implements OnInit {

  planoContas: PlanoContas[] = [];
  isLoading: boolean = false;
  subscription: Subscription | undefined;
  editMode: boolean = false;

  constructor(private planoContasService: PlanoContasService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarContas();

    this.subscription = this.planoContasService.refreshPage$.subscribe(() => {
      this.listarContas();
    })
  }

  listarContas() {
    this.isLoading = true;
    this.planoContasService.listPlanoContas()
      .subscribe(contas => {
        this.isLoading = false;
        this.planoContas = contas;
      });
  }

  abrirFormCadastro() {
    this.editMode = false;
    const modalRef = this.modalService.open(InserirEditarPlanoContasComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.editMode = this.editMode;
  }

  salvarExcel(tableData: Array<PlanoContas>) {
    const columns = ['ID', 'Conta', 'Sub-Grupo', 'Empresa'];
    const rows = tableData.map(data => [data.cod_conta_analitica, data.desc_conta, data.desc_subgrupo, data.empresa]);
    // Criação do relatório
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, "Relatório.xlsx");
  }

  salvarPDF(tableData: Array<PlanoContas>) {
    // Garante que o jsPDF foi importado e instancia um objeto novo
    const { jsPDF } = require("jspdf");
    const pdf = new jsPDF();
    const now = new Date();
    // Variavéis para o relatorio
    const columns = ['ID', 'Conta', 'Sub-Grupo', 'Empresa'];
    const rows = tableData.map(data => [data.cod_conta_analitica, data.desc_conta, data.desc_subgrupo, data.empresa]);
    // Criação do relatório
    pdf.setFontSize(20).setFont(undefined, 'bold');
    pdf.setbo
    pdf.text('Relatório Plano de Contas', 15, 20);
    pdf.setFontSize(10).setFont(undefined, 'normal');
    pdf.text('Relatório Feito em:  ' + now.toLocaleString(), 15, 26);
    pdf.autoTable({
      head: [columns],
      body: rows,
      theme: 'plain',
      startY: 35,
    });
    pdf.save("RelatorioPlanoContas.pdf");
  }
  
  verModalEmpresa(empresa: any) { }
  abrirFormAtualizacao(empresa: number) { }
  deletarModalEmpresa(empresa: any) { }
}
