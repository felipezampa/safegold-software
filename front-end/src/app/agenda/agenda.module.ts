import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AgendaComponent } from './index';


@NgModule({
  declarations: [
    AgendaComponent
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
