import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericoDirective } from './directives';
import { UppercasePipePipe } from './pipes';



@NgModule({
  declarations: [
    UppercasePipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercasePipePipe
  ]
})
export class SharedModule { }
