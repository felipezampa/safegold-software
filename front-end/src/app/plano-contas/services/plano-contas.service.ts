import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PlanoContas } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {

  planoConta: PlanoContas[] = [];
  baseURL = 'http://127.0.0.1:8000/api/fin_conta_analitica/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient) { }

  createPlanoContas(value: { cod_empresa: number; cod_plano_conta: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo POST
    return this.http.post(this.baseURL, value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updatePlanoContas(id: number, value: { cod_empresa: number; cod_plano_conta: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo PUT
    return this.http.put(this.baseURL + id + '/', value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listPlanoContas(): Observable<any> {
    // Retorna um Observable contendo todas as instancias da API 
    return this.http.get<PlanoContas[]>(this.baseURL, { headers: this.httpHeaders });
  }

  // buscarPlanoContasPorId(id: number): Observable<any>{
  //   //trazer os dados de uma unica empresa
  //   return this.http.get<PlanoContas>(this.baseURL + '?cod_empresa=' + id, { headers: this.httpHeaders })
  // }

  deletePlanoContas(id: number) {
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
