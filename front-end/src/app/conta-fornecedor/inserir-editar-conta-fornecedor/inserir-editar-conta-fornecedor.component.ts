import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inserir-editar-conta-fornecedor',
  templateUrl: './inserir-editar-conta-fornecedor.component.html',
  styleUrls: ['./inserir-editar-conta-fornecedor.component.css']
})
export class InserirEditarContaFornecedorComponent implements OnInit {

  @Input() editMode!: boolean;
  @ViewChild('formContaFornecedor') formContaFornecedor!: NgForm;
  mensagemErro: string = '';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  SalvarForm(dataForm: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }) {

    
  }

}
