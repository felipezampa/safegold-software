import { AuthService } from 'src/app/auth';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, Empresa } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL = APP_CONFIG.baseURL + 'api/empresas/';

  constructor(private http: HttpClient, private authService: AuthService) { }



  getProjetos(idUser: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Token ' + this.authService.getTokenUser()
    });

    return this.http.get<Array<{ cod_empresa: number, empresa: string, cod_projeto: number }>>
    (this.baseURL + '?cod_projeto__id_user=' + idUser,{ headers });
  }

  alteraProjeto(selectedProjetos: number) {
    const headers = new HttpHeaders({
      Authorization: 'Token ' + this.authService.getTokenUser()
    });
    return this.http.get<Empresa[]>(this.baseURL + '?cod_projeto=' + selectedProjetos,{ headers });
  }
}
