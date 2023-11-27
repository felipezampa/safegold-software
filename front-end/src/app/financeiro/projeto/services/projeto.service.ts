import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Estado, Projeto, SegmentoProjeto } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class ProjetoService {

  private baseURL = APP_CONFIG.baseURL + 'api/projetos/';
  private segmentoURL = APP_CONFIG.baseURL + 'api/projetos_segmentos/';
  private estadoURL = APP_CONFIG.baseURL + 'api/estado/';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }


  create(projeto: Projeto): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });

    return this.http.post(this.baseURL, projeto, { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  update(id: number | undefined, value: Projeto | any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });

    return this.http.put(this.baseURL + id + '/', value, { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for alterada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listProjetos(): Observable<Projeto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get<Projeto[]>(this.baseURL, { headers });
  }

  find(id: number): Observable<Projeto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser() });

    return this.http.get<Projeto[]>(this.baseURL + id + '/', { headers });
  }

  delete(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });

    return this.http.delete(this.baseURL + id + '/', { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for deletada
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }

  listSegmentos(): Observable<SegmentoProjeto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get<SegmentoProjeto[]>(this.segmentoURL, { headers });
  }

  listEstados(): Observable<Estado[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get<Estado[]>(this.estadoURL, { headers });
  }

  getEndereco(cep: number): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
