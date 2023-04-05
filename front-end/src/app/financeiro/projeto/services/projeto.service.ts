import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_CONFIG, Projeto, User } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class ProjetoService {

  projetos: Projeto[] = [];
  baseURL = APP_CONFIG.baseURL + 'projetos/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient) { }

  createProjeto(postData: { cod_projeto: number; projeto: string; ativo: number; safegold_ger: number; id_user: User }): Observable<any> {
    return this.http.post(this.baseURL, postData)
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updateProjeto(id: number | undefined, value: { cod_projeto: number; projeto: string; ativo: number; safegold_ger: number; id_user: User }): Observable<any> {
    return this.http.put(this.baseURL + id + '/', value)
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listProjetos(): Observable<any> {
    return this.http.get<Projeto[]>(this.baseURL, { headers: this.httpHeaders });
  }

  deleteProjeto(id: number) {
    return this.http.delete(this.baseURL + id + '/')
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }
}
