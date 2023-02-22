import { HttpClient } from '@angular/common/http';
import { PlanoContasService } from './../../plano-contas/services/plano-contas.service';
import { EmpresaService } from './../../empresa/services/empresa.service';
import { Empresa } from './../../shared/models/empresa.model';
import { Fornecedor } from './../../shared/models/fornecedor.model';
import { ContaAnalitica } from './../../shared/models/plano-contas.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import { MatrizAnalitica } from 'src/app/shared';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { MatrizContaFornecedorService } from '../services/matriz-conta-fornecedor.service';
import { ExcluirContaFornecedorComponent } from '../excluir-conta-fornecedor/excluir-conta-fornecedor.component';

@Component({
  selector: 'app-listar-conta-fornecedor',
  templateUrl: './listar-conta-fornecedor.component.html',
  styleUrls: ['./listar-conta-fornecedor.component.css']
})
export class ListarContaFornecedorComponent implements OnInit {
  baseURL = 'http://127.0.0.1:8000/api/matriz_analitica_fornecedor/'
  matrizAnalitica: MatrizAnalitica[] = [];
  isLoading: boolean = false;
  editMode: boolean = false;
  subscription: Subscription | undefined;
  constructor(private matrizService: MatrizContaFornecedorService , private modalService: NgbModal, private router:Router, private empresaService: EmpresaService, private analiticaService: PlanoContasService, private http : HttpClient) { }

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarContaFornecedor();
    this.listarFornecedor();
    this.listarContaAnalitica();
    this.subscription = this.matrizService.refreshPage$.subscribe(() => {
      this.listarContaFornecedor();
    })
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
    }

  }

  listarContaFornecedor() {
    this.isLoading = true;
    this.matrizService.listMatrizAnalitica()
      .subscribe(vinculo => {
        this.isLoading = false;
        this.matrizAnalitica = vinculo;
      });
  }
  listarEmpresas() {
    // Lista todos as empresas para selecionar no input de option
    this.empresaService.buscarEmpresaPorContexto().subscribe(empresas => {
      this.empresas = empresas;

    });
  }
  listarContaAnalitica(){
    this.analiticaService.listPlanoContas().subscribe(analitica => {
      this.analitica = analitica
    })
  }

  listarFornecedor(){
    // Lista todos os fornecedores para selecionar no input de option
    this.matrizService.listFornecedor().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

  deletarModal(matriz: MatrizAnalitica) {
    const modalRef = this.modalService.open(ExcluirContaFornecedorComponent, { size: 'xl' });
    modalRef.componentInstance.matriz = matriz;
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


  ///////////////////////////////////////////// CRUDUDU /////////////////////////////////////////////
  analitica: ContaAnalitica[] = [];
  empresas: Empresa[] = [];
  fornecedores : Fornecedor[] = [];
  selectedOption: any;




  atualizarMatrizAnaliticaFornecedor(id : number){
    const matriz  = this.matrizAnalitica.find(m => m.cod_matriz_analitica_fornecedor === id);
    console.log(matriz);

    // if (matriz){
    //   this.matrizService.updateMatriz(id).subscribe()
    // }


    }



}
