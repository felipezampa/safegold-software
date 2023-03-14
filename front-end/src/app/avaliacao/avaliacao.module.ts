import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoComponent } from './avaliacao.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AutoAvaliacaoComponent } from './index';



@NgModule({
  declarations: [
    AvaliacaoComponent,
    AutoAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class AvaliacaoModule { }
