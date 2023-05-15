import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseUrl = APP_CONFIG.baseURL + 'api/';
  private funcaoGestor = APP_CONFIG.baseURL + 'api/';

  constructor(private http: HttpClient) { }


  getDiaInicio(): Date {
    return new Date('2023-04-17');
  }
  getDiaFim(): Date {
    return new Date('2023-04-21');
  }

  saveAgenda() {
    //this.http.post
  }
  excluirAgenda() {
    //this.http.delete
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    let url = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=' + idGestor
    return this.http.get(url);
  }
}
