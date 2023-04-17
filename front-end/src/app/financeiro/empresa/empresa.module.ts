
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NumericoDirective } from 'src/app/shared/directives';
import { EmpresaService, ExcluirEmpresaComponent, InserirEditarEmpresaComponent, ListarEmpresaComponent, ModalEmpresaComponent } from './index';

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
