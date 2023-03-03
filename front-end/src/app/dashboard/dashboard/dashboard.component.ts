import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa, Projeto } from 'src/app/shared';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projetos: Projeto[];
  empresas: Empresa[];
  selectedProjetos: number;
  selectedEmpresa: number;
  projetosUnicos: any[];
  firstName: string;
  user_cargo: string;
  user_acesso_fin: number;
  user_acesso_av: number;
  user_is_head: number;
  constructor(private dashboardService: DashboardService, private router: Router, private authService: AuthService, private cookieService: CookieService) { }


  ngOnInit() {
    this.user_cargo = this.authService.getUserCargo()
    this.user_acesso_fin = this.authService.getUserAcessoFin()
    this.user_acesso_av = this.authService.getUserAcessoAv()
    this.user_is_head = this.authService.getUserisHead()
    this.firstName = this.authService.getUsername();
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

}
