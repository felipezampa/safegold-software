import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { ContaAnalitica, Empresa, Fornecedor, MatrizAnalitica } from 'src/app/shared';
import * as XLSX from 'xlsx';
import { ExcluirContaFornecedorComponent } from '../excluir-conta-fornecedor/excluir-conta-fornecedor.component';
import { MatrizContaFornecedorService } from '../services/matriz-conta-fornecedor.service';
import { EmpresaService } from './../../empresa/services/empresa.service';
import { PlanoContasService } from './../../plano-contas/services/plano-contas.service';

@Component({
  selector: 'app-listar-conta-fornecedor',
  templateUrl: './listar-conta-fornecedor.component.html',
  styleUrls: ['./listar-conta-fornecedor.component.css']
})
export class ListarContaFornecedorComponent implements OnInit {

  matrizAnalitica: MatrizAnalitica[] = [];

  isLoading: boolean = false;
  subscription: Subscription | undefined;
  filtroVinculo!: any[];
  filtroSelecionado: string = 'todos';
  analitica: ContaAnalitica[] = [];
  empresas: Empresa[] = [];
  fornecedores: Fornecedor[] = [];
  matrizAtualizavel: MatrizAnalitica | undefined;
  filtroNome!: string;
  constructor(private matrizService: MatrizContaFornecedorService, private modalService: NgbModal,
    private empresaService: EmpresaService, private analiticaService: PlanoContasService) { }

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarContaFornecedor();
    this.listarFornecedor();
    this.listarContaAnalitica();
    this.subscription = this.matrizService.refreshPage$.subscribe(() => {
      this.listarContaFornecedor();
    })

  }

  listarContaFornecedor() {
    this.isLoading = true;
    this.matrizService.listMatrizAnalitica()
      .subscribe(vinculo => {
        this.isLoading = false;
        this.matrizAnalitica = vinculo;
        this.filtroSelecionado = 'todos';
        this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''));
        this.matrizAnalitica.filter(
          matriz => matriz.cod_matriz_analitica_fornecedor !== null
        );
      }
      );
  }

  listarEmpresas() {
    // Lista todos as empresas para selecionar no input de option
    this.empresaService.buscarEmpresaPorContexto().subscribe(empresas => {
      this.empresas = empresas;

    });
  }

  listarContaAnalitica() {
    this.analiticaService.listPlanoContas().subscribe(analitica => {
      this.analitica = analitica;
      this.analitica.sort((a, b) => (a.desc_conta ?? '').localeCompare(b.desc_conta ?? ''))
    })
  }

  listarFornecedor() {
    // Lista todos os fornecedores para selecionar no input de option
    this.matrizService.listFornecedor().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

  salvarPDF(tableData: Array<MatrizAnalitica>) {
    // Garante que o jsPDF foi importado e instancia um objeto novo
    const { jsPDF } = require("jspdf");
    const pdf = new jsPDF();
    const now = new Date();
    // Variavéis para o relatorio
    const columns = ['ID', 'Conta', 'Fornecedor', 'Empresa'];
    const rows = tableData.map(data => [data.cod_matriz_analitica_fornecedor, data.desc_cod_conta_analitica, data.desc_fornecedor, data.empresa]);
    // Criação do relatório
    pdf.setFontSize(20).setFont(undefined, 'bold');
    pdf.setbo
    pdf.text('Relatório Vínculo de Contas E Fornecedores', 15, 20);
    pdf.setFontSize(10).setFont(undefined, 'normal');
    pdf.text('Relatório Feito em:  ' + now.toLocaleString(), 15, 26);
    pdf.autoTable({
      head: [columns],
      body: rows,
      theme: 'plain',
      startY: 35,
    });
    pdf.save("RelatorioVinculoContaFornecedores.pdf");
  }

  salvarExcel(tableData: Array<MatrizAnalitica>) {
    const columns = ['ID', 'Conta', 'Fornecedor', 'Empresa'];
    const rows = tableData.map(data => [data.cod_matriz_analitica_fornecedor, data.desc_cod_conta_analitica, data.desc_fornecedor, data.empresa]);
    // Criação do relatório
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, "RelatorioVinculoContaFornecedores.xlsx");
  }

  atualizarMatrizAnaliticaFornecedor(id: number) {
    this.matrizAtualizavel = this.matrizAnalitica.find(m => m.cod_matriz_analitica_fornecedor === id);

    if (this.matrizAtualizavel) {
      this.matrizService.updateMatriz(id, this.matrizAtualizavel).subscribe({})
    }

  }

  deletarModal(matriz: MatrizAnalitica) {
    const modalRef = this.modalService.open(ExcluirContaFornecedorComponent, { size: 'xl' });
    modalRef.componentInstance.matriz = matriz;
  }
  // FILTROS
  filtrarVinculados() {
    // Esvazia o array das matrizes
    this.matrizAnalitica = [];
    this.filtroNome = '';
    // Flag de carregamento
    this.isLoading = true;
    // Flag para indicar filtro selecionado
    this.filtroSelecionado = 'vinculados';
    // Lista todas as matrizes e filtra as que tem vinculo ( == 1)
    this.matrizService.listMatrizAnalitica()
      .subscribe(filtro => {
        this.matrizAnalitica = filtro.filter(
          matriz => matriz.vinculo == 1
        );
        // Ordena por nome crescente
        this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''))
        this.isLoading = false;
      });
  }

  filtrarNaoVinculados() {
    // Esvazia o array das matrizes
    this.matrizAnalitica = [];
    this.filtroNome = '';
    // Flag de carregamento
    this.isLoading = true;
    // Flag para indicar filtro selecionado
    this.filtroSelecionado = 'naoVinculados';
    // Lista todas as matrizes e filtra as que nao tem vinculo ( == 0)
    this.matrizService.listMatrizAnalitica()
      .subscribe(filtro => {
        this.matrizAnalitica = filtro.filter(
          matriz => matriz.vinculo == 0
        );
        // Ordena por nome crescente
        this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''))
        this.isLoading = false;
      });
  }

  filtrarTodos() {
    // Esvazia o array das matrizes
    this.matrizAnalitica = [];
    this.filtroNome = '';
    // Flag de carregamento
    this.isLoading = true;
    // Flag para indicar filtro selecionado
    this.filtroSelecionado = 'todos';
    // Lista todas as matrizes sem filtro especifico
    this.matrizService.listMatrizAnalitica()
      .subscribe(vinculo => {
        this.matrizAnalitica = vinculo;
        // Ordena por nome crescente
        this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''));
        this.isLoading = false;
      });
  }

  filtrarFornecedor(event: Event) {
    if (event != undefined) {
      // Esvazia o array das matrizes
      this.matrizAnalitica = [];
      // Flag de carregamento
      this.isLoading = true;
      if (this.filtroNome != '') {
        // Flag para indicar filtro selecionado
        this.filtroSelecionado = '';
        this.matrizService.listMatrizAnalitica()
          .subscribe(filtro => {
            this.matrizAnalitica = filtro.filter(
              // Compara filtro com o array tudo em lowercase
              matriz => matriz.desc_fornecedor.toLowerCase().includes(this.filtroNome.toLowerCase())
            );
            // Ordena por nome crescente
            this.matrizAnalitica.sort((a, b) => (a.desc_fornecedor ?? '').localeCompare(b.desc_fornecedor ?? ''))
            this.isLoading = false;
          });
      } else {
        this.filtroSelecionado = 'todos';
        this.filtrarTodos();
      }
    }
  }
}