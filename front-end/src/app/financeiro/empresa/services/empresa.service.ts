import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Empresa } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseURL = APP_CONFIG.baseURL + 'api/empresas/'
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  createEmpresa(value: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});

    // Retorna um Observable apos executar o metodo POST
    return this.http.post(this.baseURL, value, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updateEmpresa(id: number, value: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});

    // Retorna um Observable apos executar o metodo PUT
    return this.http.put(this.baseURL + id + '/', value, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listEmpresas(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<Empresa[]>(this.baseURL + '?cod_projeto__id_user='+ this.authService.getCurrentUser(), { headers });
  }

  buscarEmpresaPorId(id: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    //trazer os dados de uma unica empresa
    return this.http.get<Empresa>(this.baseURL + '?cod_empresa=' + id, { headers })
  }

  deleteEmpresa(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});

    //Deleta uma instancia da API
    return this.http.delete(this.baseURL + id + '/', {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }

  buscarEmpresaPorContexto(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    return this.http.get<Empresa[]>(this.baseURL + '?cod_projeto=' + this.authService.getCurrentProjeto(), { headers });
  }
}
