import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent, AgendaHistoricoComponent } from './agenda';
import { LoginComponent, PageNotFoundComponent } from './auth';
import { AuthGuard } from './auth/auth.guard';
import { AutoAvaliacaoComponent, AvaliacaoComponent } from './avaliacao';
import { DashboardComponent } from './dashboard';
import { DashboardFinanceiroComponent, FinanceiroComponent, ListarContaFornecedorComponent, ListarEmpresaComponent, ListarPlanoContasComponent } from './financeiro';
import { InserirAgendaComponent } from './agenda/inserir-agenda/inserir-agenda.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'financeiro',
    component: FinanceiroComponent, children:[
      { path: '', component: DashboardFinanceiroComponent, canActivate: [AuthGuard] },
      { path: 'empresas', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'plano-de-contas', component: ListarPlanoContasComponent,canActivate: [AuthGuard] },
      { path: 'conta-fornecedor', component: ListarContaFornecedorComponent,canActivate: [AuthGuard] },
      { path: 'dashboard-financeiro', component: DashboardFinanceiroComponent,canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'agenda',
    component: AgendaComponent, children:[
      { path: '', component: InserirAgendaComponent, canActivate: [AuthGuard] },
      { path: 'historico', component: AgendaHistoricoComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'avaliacao',
    component: AvaliacaoComponent, children:[
      { path: 'autoavaliacao', component: AutoAvaliacaoComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
