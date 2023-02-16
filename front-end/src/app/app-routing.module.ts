import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListarContaFornecedorComponent } from './conta-fornecedor';
import { DashboardComponent } from './dashboard';
import { ListarEmpresaComponent } from './empresa';
import { ListarPlanoContasComponent } from './plano-contas';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'empresas',
    component: ListarEmpresaComponent,
  },
  {
    path: 'plano-de-contas',
    component: ListarPlanoContasComponent,
  },
  {
    path: 'conta-fornecedor',
    component: ListarContaFornecedorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
