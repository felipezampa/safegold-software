import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import { ExcluirContaFornecedorComponent } from './excluir-conta-fornecedor/excluir-conta-fornecedor.component';
import { ListarContaFornecedorComponent } from './listar-conta-fornecedor/listar-conta-fornecedor.component';
import { MatrizContaFornecedorService } from './services/matriz-conta-fornecedor.service';


@NgModule({
  declarations: [
    ListarContaFornecedorComponent,
    ExcluirContaFornecedorComponent,
    OrderByPipe
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
