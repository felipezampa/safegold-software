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

  constructor(private dashboardService: DashboardService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.firstName = this.authService.getUsername();
    this.getProjetos();
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/empresas']);
    }
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
    localStorage.setItem("selectedEmpresa", JSON.stringify({ cod_empresa: cod_empresa, empresa: selectedEmpresa?.empresa, cod_projeto: selectedEmpresa?.cod_projeto, projeto: selectedEmpresa?.projeto }));
  }


  // onCardClick(cod_empresa: string) {
  // Armazenando o valor do id do card clicado no dashboard
  //  const selectedEmpresa = this.empresas.find(empresa => empresa.cod_empresa == cod_empresa);

  //  localStorage.setItem("selectedCard", JSON.stringify({cod_empresa: cod_empresa, empresa: selectedEmpresa.empresa, cod_projeto: selectedEmpresa.cod_projeto, projeto: selectedEmpresa.projeto}));

  // this.router.navigate(['/plano-de-contas']);

  // }


}
