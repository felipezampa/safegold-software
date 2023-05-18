import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseUrl = APP_CONFIG.baseURL + 'api/';
  private funcaoGestor = APP_CONFIG.baseURL + 'api/';

  constructor(private http: HttpClient, private authService: AuthService) { }


  getDiaInicio(): Date {
    return new Date('2023-04-17');
  }
  getDiaFim(): Date {
    return new Date('2023-04-21');
  }

  saveAgenda(data: any) {
    console.log(data);
    
    //this.http.post
  }
  excluirAgenda() {
    //this.http.delete2
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    let url = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=' + idGestor
    return this.http.get(url, { headers });
  }

  listTipo(): Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    let url = APP_CONFIG.baseURL + '/api/ag_tipo/';
    return this.http.get(url,{headers});
  }
}
