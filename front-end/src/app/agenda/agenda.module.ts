import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AgendaComponent, AgendaHistoricoComponent, InserirAgendaComponent, EditarAgendaComponent, InserirProjetoComponent, AgendaService } from './index';

@NgModule({
  declarations: [
    AgendaComponent,
    AgendaHistoricoComponent,
    InserirAgendaComponent,
    EditarAgendaComponent,
    InserirProjetoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    AgendaService,
    provideNgxMask()
  ]
})
export class AgendaModule { }
