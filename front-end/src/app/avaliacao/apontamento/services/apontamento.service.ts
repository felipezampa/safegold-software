import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Apontamento } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class ApontamentoService {
  empresas: Apontamento[] = [];
  baseURL = 'http://127.0.0.1:8000/api/rh_apro_gestor/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient) { }

  createApontamento(postData: { story_id: string; data_apto: Date; vlr_apto: number; }): Observable<any> {
    return this.http.post(this.baseURL, postData)
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updateApontamento(id: number | undefined, value: { story_id: string; data_apto: Date; vlr_apto: number; }): Observable<any> {
    return this.http.put(this.baseURL + id + '/', value)
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listApontamento(): Observable<any> {
    return this.http.get<Apontamento[]>(this.baseURL, { headers: this.httpHeaders });
  }

  deleteApontamento(id: number) {
    return this.http.delete(this.baseURL + id + '/')
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }
}
