import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcluirContaFornecedorComponent, ListarContaFornecedorComponent, MatrizContaFornecedorService } from './index';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarContaFornecedorComponent,
    ExcluirContaFornecedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    MatrizContaFornecedorService
  ]
})
export class ContaFornecedorModule { }
