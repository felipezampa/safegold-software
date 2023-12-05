import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlterarSenhaComponent, AuthService, LoginComponent, PageNotFoundComponent } from './index';


@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
