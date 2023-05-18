import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tipoUrl = APP_CONFIG.baseURL + 'api/ag_tipo/';
  private funcaoGestorUrl = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=';

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveAgenda(data: any) {
    return this.http.post('http://localhost:3000/Agenda', data);
  }

  updateAgenda(data: any) {
    // IMPLEMENTAR NO FUTURO
  }
  excluirAgenda() {
    // IMPLEMENTAR NO FUTURO
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.funcaoGestorUrl + idGestor, { headers });
  }

  listTipo(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.tipoUrl, { headers });
  }
}
