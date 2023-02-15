import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getProjetos() {
    return this.http.get<Array<{cod_empresa: number, empresa: string, cod_projeto: number}>>(`http://localhost:8000/api/empresas/?cod_projeto__id_user=${this.getCurrentUser()}`)
  }

  alteraProjeto(selectedProjetos: number){
      return this.http.get<Empresa[]>(`http://localhost:8000/api/empresas/?cod_projeto=${selectedProjetos}`)
  }
}
