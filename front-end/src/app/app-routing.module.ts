import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListarEmpresaComponent } from './empresa/listar-empresa/listar-empresa.component';
import { ListarProjetoComponent } from './projeto/listar-projeto/listar-projeto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'empresas',
    pathMatch: 'full'
  },
  {
    path: 'empresas',
    component: ListarEmpresaComponent,
  },
  {
    path: 'projetos',
    component: ListarProjetoComponent,
  },
  {
    //TEMPORARIO
    path: 'login',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
