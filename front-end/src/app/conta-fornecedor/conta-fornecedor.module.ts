import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcluirContaFornecedorComponent, InserirEditarContaFornecedorComponent, ListarContaFornecedorComponent, MatrizContaFornecedorService } from './index';



@NgModule({
  declarations: [
    ListarContaFornecedorComponent,
    InserirEditarContaFornecedorComponent,
    ExcluirContaFornecedorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MatrizContaFornecedorService
  ]
})
export class ContaFornecedorModule { }
