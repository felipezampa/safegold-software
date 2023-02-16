import { AuthService } from 'src/app/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { MatrizAnalitica } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class MatrizContaFornecedorService {

  baseURL = 'http://127.0.0.1:8000/api/matriz_analitica_fornecedor/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  listMatrizAnalitica(): Observable<MatrizAnalitica[]> {
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<MatrizAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers: this.httpHeaders });
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
}
