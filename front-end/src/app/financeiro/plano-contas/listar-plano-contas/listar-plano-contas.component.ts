import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { ContaAnalitica } from 'src/app/shared';
import * as XLSX from 'xlsx';
import { ExcluirPlanoContasComponent, InserirEditarPlanoContasComponent, PlanoContasService } from '../index';


@Component({
  selector: 'app-listar-plano-contas',
  templateUrl: './listar-plano-contas.component.html',
  styleUrls: ['./listar-plano-contas.component.css']
})
export class ListarPlanoContasComponent implements OnInit {

  planoContas: ContaAnalitica[] = [];
  isLoading: boolean = false;
  editMode: boolean = false;
  subscription: Subscription | undefined;
  filtroSubGrupo!: string;
  filtroConta!: string;
  filtroTodos: boolean = true;

  constructor(private planoContasService: PlanoContasService, private modalService: NgbModal, private authService: AuthService) { }

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
    const modalRef = this.modalService.open(InserirEditarPlanoContasComponent, { size: 'xl' });
    modalRef.componentInstance.editMode = this.editMode;
    modalRef.componentInstance.cod_empresa = this.authService.getCurrentCod_empresa();
  }

  abrirFormAtualizacao(id: number) {
    this.editMode = true;
    const modalRef = this.modalService.open(InserirEditarPlanoContasComponent, { size: 'xl' });
    modalRef.componentInstance.idConta = id;
    modalRef.componentInstance.editMode = this.editMode;
  }

  deletarModal(conta: ContaAnalitica) {
    const modalRef = this.modalService.open(ExcluirPlanoContasComponent, { size: 'xl' });
    modalRef.componentInstance.conta = conta;
  }

  salvarPDF(tableData: Array<ContaAnalitica>) {
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

  salvarExcel(tableData: Array<ContaAnalitica>) {
    const columns = ['ID', 'Conta', 'Sub-Grupo', 'Empresa'];
    const rows = tableData.map(data => [data.cod_conta_analitica, data.desc_conta, data.desc_subgrupo, data.empresa]);
    // Criação do relatório
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, "RelatorioPlanoContas.xlsx");
  }

  filtrarConta(event: Event) {
    if (event != undefined) {
      // Esvazia o array
      this.planoContas = [];
      // Flag de carregamento
      this.isLoading = true;
      this.filtroTodos = false;
      if (this.filtroConta != '') {
        this.planoContasService.listPlanoContas()
          .subscribe(filtro => {
            this.planoContas = filtro.filter(
              // Compara filtro com o array tudo em lowercase
              emp => emp.desc_conta.toLowerCase().includes(this.filtroConta.toLowerCase())
            );
            // Ordena por nome crescente
            this.planoContas.sort((a, b) => (a.desc_conta ?? '').localeCompare(b.desc_conta ?? ''))
            this.isLoading = false;
          });
      } else {
        this.listarContas();
      }
    }
  }

  filtrarTodos() {
    this.filtroConta = '';
    this.filtroSubGrupo = '';
    // Esvazia o array das matrizes
    this.planoContas = [];
    // Flag de carregamento
    this.isLoading = true;
    // Flag para indicar filtro selecionado
    this.filtroTodos = true;
    // Lista todas as matrizes sem filtro especifico
    this.planoContasService.listPlanoContas()
      .subscribe(filtro => {
        this.planoContas = filtro;
        // Ordena por nome crescente
        this.planoContas.sort((a, b) => (a.desc_conta ?? '').localeCompare(b.desc_conta ?? ''))
        this.isLoading = false;
      });
  }
}
