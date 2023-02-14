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




  projetos: any[];
  empresas: any[];
  selectedProjetos: any;
  projetos_unicos: any[];
  first_name: string;

  constructor(private http: HttpClient, private router:Router) {
    this.first_name = this.getUsername()
  }

  ngOnInit() {
    this.getProjetos();
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/empresas']);

  }
  }
  getUsername(){
    const currentUser = localStorage.getItem('currentUser');

    return currentUser ? JSON.parse(currentUser).first_name : null;

  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user_id : null;
  }

  getProjetos() {
    this.http.get<Array<{cod_empresa: number, empresa: string, cod_projeto: number}>>(`http://localhost:8000/api/empresas/?cod_projeto__id_user=${this.getCurrentUser()}`)
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

  onProjectChange() {
    if (this.selectedProjetos) {
      this.http.get<Empresa[]>(`http://localhost:8000/api/empresas/?cod_projeto=${this.selectedProjetos}`)
        .subscribe(data => {
          this.empresas = data;
        });
    }
  }

  // onCardClick(cod_empresa: string) {
    // Armazenando o valor do id do card clicado no dashboard
  //  const selectedEmpresa = this.empresas.find(empresa => empresa.cod_empresa == cod_empresa);

  //  localStorage.setItem("selectedCard", JSON.stringify({cod_empresa: cod_empresa, empresa: selectedEmpresa.empresa, cod_projeto: selectedEmpresa.cod_projeto, projeto: selectedEmpresa.projeto}));

  // this.router.navigate(['/plano-de-contas']);

 // }

  onEmpresaChanged(cod_empresa: string) {
    const selectedEmpresa = this.empresas.find(empresa => empresa.cod_empresa == cod_empresa);
    localStorage.setItem("selectedEmpresa", JSON.stringify({cod_empresa: cod_empresa, empresa: selectedEmpresa.empresa, cod_projeto: selectedEmpresa.cod_projeto, projeto: selectedEmpresa.projeto}));
  }
  selectedEmpresa() {
    this.onEmpresaChanged
  }
}
