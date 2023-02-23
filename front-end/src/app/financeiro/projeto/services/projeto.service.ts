import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User, Projeto } from 'src/app/shared';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  projetos: Projeto[] = [];
  baseURL = 'http://127.0.0.1:8000/api/projetos/'
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
