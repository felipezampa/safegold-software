import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');

    return currentUser ? JSON.parse(currentUser).user_id : null;
  }
  projetos: any[];
  empresas: any[];
  selectedProjetos: any;
  projetos_unicos: any[];

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.getProjetos();
  }

  getProjetos() {
    this.http.get<Array<{cod_empresa: number, empresa: string, cod_projeto: number}>>(`http://localhost:8000/api/empresas/?id_user=${this.getCurrentUser()}`)
      .subscribe(data => {
        this.projetos = data;
        this.getUniqueProjetos();
      });
  }

  getUniqueProjetos() {
    this.projetos_unicos = [];
    this.projetos.forEach((projeto) => {
      if (!this.projetos_unicos.find(p => p.cod_projeto === projeto.cod_projeto)) {
        this.projetos_unicos.push(projeto);
      }
    });
  }

  getEmpresas(cod_projeto : number) {
    this.selectedProjetos = cod_projeto;
    this.http.get<Array<{cod_empresa: number, empresa: string, cod_projeto: number}>>(`http://localhost:8000/api/empresas/?cod_projeto=${cod_projeto}`)
      .subscribe(data => {
        this.empresas = data;
      });
  }

  onProjectChange() {
    if (this.selectedProjetos) {
      this.http.get<Empresa[]>(`http://localhost:8000/api/empresas/?cod_projeto=${this.selectedProjetos}`)
        .subscribe(data => {
          this.empresas = data;
        });
    }
  }

  onCardClick(cod_empresa: string) {
    // Armazenando o valor do id do card clicado no dashboard
    localStorage.setItem("selectedCardId", cod_empresa);
    this.router.navigate(['/plano-de-contas']);

  }
}
