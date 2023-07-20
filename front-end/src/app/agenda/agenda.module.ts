import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AgendaComponent, AgendaHistoricoComponent, InserirAgendaComponent, CardComponent, ModalAgendaComponent, EditarAgendaComponent } from './index';

@NgModule({
  declarations: [
    AgendaComponent,
    AgendaHistoricoComponent,
    InserirAgendaComponent,
    CardComponent,
    ModalAgendaComponent,
    EditarAgendaComponent
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
    provideNgxMask()
  ]
})
export class AgendaModule { }
