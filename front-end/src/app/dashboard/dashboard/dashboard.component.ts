import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { Empresa, Projeto, SwalFacade } from 'src/app/shared';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projetos!: Projeto[];
  empresas!: Empresa[];
  selectedProjetos!: number;
  selectedEmpresa!: number;
  projetosUnicos!: any[];
  firstName: string = '';
  user_cargo!: string;
  user_acesso_fin!: boolean;
  user_acesso_av!: boolean;
  user_is_head!: boolean;
  is_superuser!: string;
  user_id!: number;
  user!: any;

  constructor(private dashboardService: DashboardService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.user_cargo = this.authService.getCargoUser();
    this.user_acesso_fin = this.authService.getUserAcessoFin();
    this.user_acesso_av = this.authService.getUserAcessoAv();
    this.user_is_head = this.authService.getUserisHead();
    this.firstName = this.authService.getUsername();
    this.is_superuser = this.authService.getIsSuperUser();
    this.getProjetos();
    const contexto = JSON.parse(localStorage.getItem('selectedEmpresa') ?? '');
    this.selectedProjetos = contexto?.cod_projeto;
    this.selectedEmpresa = contexto?.cod_empresa;
    this.onProjectChange()
  }

  getProjetos() {
    this.dashboardService.getProjetos(this.authService.getCurrentUser())
      .subscribe(data => {
        this.projetos = data;
        this.getUniqueProjetos();
      });
  }

  getUniqueProjetos() {
    this.projetosUnicos = [];
    this.projetos.forEach((projeto) => {
      if (!this.projetosUnicos.find(p => p.cod_projeto === projeto.cod_projeto)) {
        this.projetosUnicos.push(projeto);
      }
    });
  }

  onProjectChange() {
    if (this.selectedProjetos) {
      this.dashboardService.alteraProjeto(this.selectedProjetos)
        .subscribe(data => {
          this.empresas = data;
        });
    }
  }

  onEmpresaChanged(cod_empresa: number) {
    const selectedEmpresa = this.empresas.find(empresa => empresa.cod_empresa == cod_empresa);
    localStorage.setItem("selectedEmpresa", JSON.stringify({ cod_empresa: selectedEmpresa?.cod_empresa, empresa: selectedEmpresa?.empresa, cod_projeto: selectedEmpresa?.cod_projeto, projeto: selectedEmpresa?.projeto }));
  }

  validacaoAcessoFin() {
    if (this.user_acesso_fin != true) {
      SwalFacade.erro("Acesso Negado", "Você não tem acesso a essa página");
    } else {
      // IMPORTANTE - Sempre usar this.router.navigate ao inves de window.location.href pois o router nao atualiza a pagina e eh mais rapido
      // o window atualiza e demora mais
      this.router.navigate(['/financeiro','dashboard-financeiro'])
    }
  }
  
  validacaoAcessoRH() {
    if (this.user_acesso_av != true) {
      SwalFacade.erro("Acesso Negado", "Você não tem acesso a essa página");
    } else {
      this.router.navigate(['/avaliacao'])
    }
  }
  
  validacaoAcessoAgenda() {
    this.router.navigate(['/agenda'])
  }

  logout() {
    this.authService.logout();
  }
}
