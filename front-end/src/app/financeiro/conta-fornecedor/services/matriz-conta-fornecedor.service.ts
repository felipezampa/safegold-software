import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, ContaAnalitica, Fornecedor, MatrizAnalitica } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class MatrizContaFornecedorService {

  matrizAnalitica: MatrizAnalitica[] = [];
  analitica: ContaAnalitica[] = [];
  baseURL = APP_CONFIG.baseURL + 'api/matriz_analitica_fornecedor/';
  baseFornecedor = APP_CONFIG.baseURL + 'api/fornecedor/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }
  listMatrizAnalitica(): Observable<MatrizAnalitica[]> {
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<MatrizAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers: this.httpHeaders });
  }
  listFornecedor(): Observable<Fornecedor[]> {
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<Fornecedor[]>(this.baseFornecedor + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers: this.httpHeaders });
  }

  createPlanoContas(value: { cod_empresa: number; cod_conta_analitica: number; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo POST
    return this.http.post(this.baseURL, value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  deleteEmpresa(id: number) {
    //Deleta uma instancia da API
    return this.http.delete(this.baseURL + id + '/')
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }
  updateMatriz(id: number, value: { cod_conta_analitica: number, cod_fornecedor: number, cod_empresa: number }): Observable<any> {

    return this.http.put(this.baseURL + id + '/', value)
      .pipe(
        tap(() => {
          this._refreshPage$.next();
        })
      );
  }


}
