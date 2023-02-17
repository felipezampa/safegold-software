import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/empresa';
import { PlanoContasService } from 'src/app/plano-contas';
import { ContaAnalitica, Empresa, Fornecedor } from 'src/app/shared';
import { MatrizContaFornecedorService } from '../services/matriz-conta-fornecedor.service';

@Component({
  selector: 'app-inserir-editar-conta-fornecedor',
  templateUrl: './inserir-editar-conta-fornecedor.component.html',
  styleUrls: ['./inserir-editar-conta-fornecedor.component.css']
})
export class InserirEditarContaFornecedorComponent implements OnInit {

  @Input() editMode!: boolean;
  @ViewChild('formContaFornecedor') formContaFornecedor!: NgForm;
  mensagemErro: string = '';
  analitica: ContaAnalitica[] = [];
  empresas: Empresa[] = [];
  fornecedores: Fornecedor[] = [];

  constructor(public activeModal: NgbActiveModal, private empresaService: EmpresaService, private analiticaService: PlanoContasService, private matrizService: MatrizContaFornecedorService ) { }

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarFornecedor();
    this.listarContaAnalitica();
  }

  SalvarForm(dataForm: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }) {


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
      console.log(this.analitica);
    })
  }

  listarFornecedor(){
    // Lista todos os fornecedores para selecionar no input de option
    this.matrizService.listFornecedor().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

}
