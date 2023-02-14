import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListarEmpresaComponent } from './empresa';
import { ListarPlanoContasComponent } from './plano-contas';
import { DashboardComponent } from './dashboard/dashboard.component';

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
