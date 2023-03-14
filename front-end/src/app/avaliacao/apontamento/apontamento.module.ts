import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApontamentoService, ApontamentoGestorComponent } from './index';

@NgModule({
  declarations: [
    ApontamentoGestorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApontamentoService
  ]
})
export class ApontamentoModule { }
