import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG } from 'src/app/shared';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tipoUrl = APP_CONFIG.baseURL + 'api/ag_tipo/';
  private funcaoGestorUrl = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  salvarAgenda(data: any) {
    return this.http.post('http://localhost:3000/Agenda', data)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listarAgenda(): Observable<any> {
    return this.http.get('http://localhost:3000/Agenda');
  }

  procurarAgenda(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/Agenda/' + id);
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
