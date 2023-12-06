import { Component, OnInit } from '@angular/core';
import { AlterarSenhaComponent, AuthService } from 'src/app/auth';
import { Empresa, Projeto, SwalFacade } from 'src/app/shared';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private dashboardService: DashboardService, private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.user_cargo = this.authService.getCargoUser();
    this.user_acesso_fin = this.authService.getUserAcessoFin();
    this.user_acesso_av = this.authService.getUserAcessoAv();
    this.user_is_head = this.authService.getUserisHead();
    this.firstName = this.authService.getFirstName();
    this.is_superuser = this.authService.getIsSuperUser();
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
      // this.router.navigate(['/avaliacao'])
      SwalFacade.alerta('Módulo não implementado ainda')
    }
  }
  
  validacaoAcessoAgenda() {
    this.router.navigate(['/agenda'])
  }

  logout() {
    this.authService.logout();
  }

  mudarSenha() {
    this.modalService.open(AlterarSenhaComponent, { size: 'lg' });
  }

  validacaoSankhya() {
    SwalFacade.alerta('Módulo não implementado ainda')
  }
}
