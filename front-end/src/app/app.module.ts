import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaModule } from './empresa/empresa.module';
import { AuthModule } from './auth/auth.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PlanoContasModule } from './plano-contas/plano-contas.module';
import { ProjetoModule } from './projeto/projeto.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmpresaModule,
    ProjetoModule,
    PlanoContasModule,
    AuthModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
