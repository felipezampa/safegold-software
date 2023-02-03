import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExcluirEmpresaComponent, ModalEmpresaComponent, ListarEmpresaComponent, InserirEditarEmpresaComponent, EmpresaService } from './index';
import { NumericoDirective } from '../shared/directives/numerico.directive';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ListarEmpresaComponent,
    ExcluirEmpresaComponent,
    ModalEmpresaComponent,
    InserirEditarEmpresaComponent,
    NumericoDirective,
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
    EmpresaService,
    provideNgxMask()
  ]
})
export class EmpresaModule { }
