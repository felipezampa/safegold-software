import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Fornecedor, MatrizAnalitica } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class MatrizContaFornecedorService {

  private baseURL = APP_CONFIG.baseURL + 'api/matriz_analitica_fornecedor/';
  private baseFornecedor = APP_CONFIG.baseURL + 'api/fornecedor/';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService,) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  listMatrizAnalitica(): Observable<MatrizAnalitica[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<MatrizAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers});
  }

  listFornecedor(): Observable<Fornecedor[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<Fornecedor[]>(this.baseFornecedor + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers});
  }

  createPlanoContas(value: { cod_empresa: number; cod_conta_analitica: number; cod_subgrupo_contas: number }): Observable<any> {
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

  updateMatriz(id: number, value: { cod_conta_analitica: number, cod_fornecedor: number, cod_empresa: number }): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});
    // Atualiza uma instancia da API
    return this.http.put(this.baseURL + id + '/', value, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }

  deleteVinculo(id: number) : Observable<any>{
    
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});
    return this.http.get<MatrizAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers});
    // // Deleta uma instancia da API
    // return this.http.delete(this.baseURL + id + '/', {headers})
    //   // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
    //   .pipe(
    //     tap(() => {
    //       this._refreshPage$.next();
    //     })
    //   );
  }
}
