import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListarEmpresaComponent } from './empresa';
import { ListarPlanoContasComponent } from './plano-contas';

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
