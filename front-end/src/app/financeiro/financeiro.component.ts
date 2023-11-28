import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { DashboardService } from '../dashboard';
import { APP_CONFIG, Empresa, Projeto } from '../shared';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {

  currentUser!: boolean;
  empresas!: Empresa[];
  projetos!: Projeto[];
  selectedProjetos!: number;
  selectedEmpresa!: number;
  projetosUnicos!: Projeto[];
  firstName!: string;
  isSuperuser!: boolean;
  adminURL = APP_CONFIG.baseURL;
  currentRoute!: string;

  constructor(private authService: AuthService, private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    // Atualiza a opcao da sidebar pela primeira vez
    this.currentRoute = this.router.url;
    // Observer para ver quando o usuario muda de tela e atualizar a sidebar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Atualiza rota atual a variavel
        this.currentRoute = event.url;
      }
    });
    this.setCurrentUser();
    this.isSuperuser = this.authService.getIsSuperUser();
    this.firstName = this.authService.getFirstName();

    // chama a função getProjetos novamente para obter os projetos mais recentes do usuário
    this.dashboardService.getProjetos(this.authService.getCurrentUser())
      .subscribe(data => {
        this.projetos = data;
        this.getUniqueProjetos();
      });

    const contexto = JSON.parse(localStorage.getItem('selectedEmpresa') ?? '');
    this.selectedProjetos = contexto?.cod_projeto;
    this.selectedEmpresa = contexto?.cod_empresa;
    this.onProjectChange();
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
      // Utiliza a funcao sort e percorre o array fazendo comparacao para ordenar com o nome de forma crescente
      this.projetos.sort((a, b) => (a.projeto ?? '').localeCompare(b.projeto ?? ''));
      this.projetosUnicos.filter(projeto => projeto.acesso_financeiro = true);
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
    window.location.reload();

  }

  setCurrentUser() {
    if (this.authService.getCurrentUser() != null) {
      this.currentUser = true;
    } else {
      this.currentUser = false;
      this.selectedProjetos = null ?? 0; // Limpa o contexto selecionado
      this.selectedEmpresa = null ?? 0;
    }
  }

  logout() {
    this.authService.logout();
  }
}
