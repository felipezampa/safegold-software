import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, Empresa } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL = APP_CONFIG.baseURL + 'empresas/';

  constructor(private http: HttpClient) { }

  getProjetos(idUser: number): Observable<any> {
    return this.http.get<Array<{ cod_empresa: number, empresa: string, cod_projeto: number }>>
    (this.baseURL + '?cod_projeto__id_user=' + idUser);
  }

  alteraProjeto(selectedProjetos: number) {
    return this.http.get<Empresa[]>(this.baseURL + '?cod_projeto=' + selectedProjetos);
  }
}
