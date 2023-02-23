import { AuthService } from 'src/app/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ContaAnalitica, SubGrupo } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {

  baseURL = 'http://127.0.0.1:8000/api/fin_conta_analitica/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient, private authService: AuthService) { }



  createPlanoContas(value: { cod_empresa: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo POST
    return this.http.post(this.baseURL, value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updatePlanoContas(id: number, value: { cod_empresa: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo PUT
    return this.http.put(this.baseURL + id + '/', value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listPlanoContas(): Observable<ContaAnalitica[]> {
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<ContaAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers: this.httpHeaders });
  }

  buscarPlanoContasPorId(id: number): Observable<any>{
    //trazer os dados de uma unica instancia
    return this.http.get<ContaAnalitica>(this.baseURL + '?cod_conta_analitica=' + id, { headers: this.httpHeaders })
  }

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

  listSubGrupoContas(): Observable<any> {
    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<SubGrupo[]>('http://127.0.0.1:8000/api/fin_subgrupo_contas/', { headers: this.httpHeaders });
  }
}
