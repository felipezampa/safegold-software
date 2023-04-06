import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, LoginComponent } from 'src/app/auth';
import { Empresa, Projeto } from 'src/app/shared';
import Swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';

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



  constructor( private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getUser();
    console.log(user.id_user);
    console.log(user.username);
    console.log(user.email);
    console.log(user.first_name);
    console.log(user.last_name);
    console.log(user.avaliacao);
    console.log(user.financeiro);
    console.log(user.head_de_area);
    console.log(user.superuser);
    console.log(user.cargo);


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
      Swal.fire({
        title: "Acesso Negado",
        text: 'Você não tem acesso a essa página',
        icon: 'error'
      });
    } else {
      window.location.href = 'financeiro/dashboard-financeiro'
    }
  }
  validacaoAcessoRH() {
    if (this.user_acesso_av != true) {
      Swal.fire({
        title: "Acesso Negado",
        text: 'Você não tem acesso a essa página',
        icon: 'error'
      });
    } else {
      window.location.href = 'avaliacao'
    }
  }

  logout() {
    this.authService.logout();
  }
}
