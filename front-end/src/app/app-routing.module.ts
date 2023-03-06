import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth';
import { AuthGuard } from './auth.guard';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { DashboardComponent } from './dashboard';
import { FinanceiroComponent, ListarContaFornecedorComponent, ListarEmpresaComponent, ListarPlanoContasComponent } from './financeiro';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'financeiro',
    component: FinanceiroComponent, children:[
      { path: 'empresas', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'plano-de-contas', component: ListarPlanoContasComponent,canActivate: [AuthGuard] },
      { path: 'conta-fornecedor', component: ListarContaFornecedorComponent,canActivate: [AuthGuard] }
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
