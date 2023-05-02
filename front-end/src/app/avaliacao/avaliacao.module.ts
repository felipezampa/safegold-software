import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoAvaliacaoComponent, AvaliacaoComponent } from './index';



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
