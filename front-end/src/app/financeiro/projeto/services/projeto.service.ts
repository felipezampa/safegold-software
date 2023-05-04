import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Projeto, User } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class ProjetoService {

  private baseURL = APP_CONFIG.baseURL + 'api/projetos/';
  // private httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  createProjeto(value: { cod_projeto: number; projeto: string; ativo: number; safegold_ger: number; id_user: User }): Observable<any> {
    return this.http.post(this.baseURL, value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updateProjeto(id: number | undefined, value: { cod_projeto: number; projeto: string; ativo: number; safegold_ger: number; id_user: User }): Observable<any> {
    return this.http.put(this.baseURL + id + '/', value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for alterada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listProjetos(): Observable<Projeto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    return this.http.get<Projeto[]>(this.baseURL, { headers});
  }

  deleteProjeto(id: number) {
    return this.http.delete(this.baseURL + id + '/')
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for deletada
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }
}
