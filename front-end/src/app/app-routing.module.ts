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
<<<<<<< Updated upstream
      { path: 'empresas', component: ListarEmpresaComponent },
      { path: 'plano-de-contas', component: ListarPlanoContasComponent },
      { path: 'conta-fornecedor', component: ListarContaFornecedorComponent }
    ]
=======
      { path: 'empresas', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'plano-de-contas', component: ListarPlanoContasComponent,canActivate: [AuthGuard] },
      { path: 'conta-fornecedor', component: ListarContaFornecedorComponent,canActivate: [AuthGuard] },
      { path: 'dashboard-financeiro', component: DashboardFinanceiroComponent,canActivate: [AuthGuard] },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'avaliacao',
    component: AvaliacaoComponent, children:[
    //   { path: 'autoavaliacao', component: ListarEmpresaComponent },
    //   { path: 'plano-de-contas', component: ListarPlanoContasComponent },
    //   { path: 'conta-fornecedor', component: ListarContaFornecedorComponent }
    ],
    canActivate: [AuthGuard]
>>>>>>> Stashed changes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
