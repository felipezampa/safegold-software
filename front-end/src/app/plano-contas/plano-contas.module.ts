import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExcluirPlanoContasComponent, InserirEditarPlanoContasComponent, ListarPlanoContasComponent, PlanoContasService } from './index';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ListarPlanoContasComponent,
    InserirEditarPlanoContasComponent,
    ExcluirPlanoContasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    Ng2SearchPipeModule
  ],
  providers: [
    PlanoContasService,
    provideNgxMask()
  ]
})
export class PlanoContasModule { }
