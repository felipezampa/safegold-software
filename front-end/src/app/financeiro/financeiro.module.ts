import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContaFornecedorModule, EmpresaModule, FinanceiroComponent, PlanoContasModule, ProjetoModule } from './index';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FinanceiroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ContaFornecedorModule,
    EmpresaModule,
    ProjetoModule,
    PlanoContasModule
  ]
})
export class FinanceiroModule { }
