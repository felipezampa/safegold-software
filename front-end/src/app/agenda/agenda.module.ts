import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AgendaComponent } from './index';
import { AgendaHistoricoComponent } from './agenda-historico/agenda-historico.component';
import { InserirAgendaComponent } from './inserir-agenda/inserir-agenda.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AgendaComponent,
    AgendaHistoricoComponent,
    InserirAgendaComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    Ng2SearchPipeModule
  ],
  providers: [
    provideNgxMask()
  ]
})
export class AgendaModule { }
