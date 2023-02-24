import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth';
import { DashboardComponent } from './dashboard';
import { FinanceiroComponent, ListarContaFornecedorComponent, ListarEmpresaComponent, ListarPlanoContasComponent } from './financeiro';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'financeiro',
    component: FinanceiroComponent, children:[
      { path: 'empresas', component: ListarEmpresaComponent },
      { path: 'plano-de-contas', component: ListarPlanoContasComponent },
      { path: 'conta-fornecedor', component: ListarContaFornecedorComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
