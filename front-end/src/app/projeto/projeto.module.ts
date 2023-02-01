import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListarProjetoComponent } from './listar-projeto/listar-projeto.component';
import { ProjetoService } from './services/projeto.service';



@NgModule({
  declarations: [
    ListarProjetoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ], 
  providers: [
    ProjetoService,
  ]
})
export class ProjetoModule { }
