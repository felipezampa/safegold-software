import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, ContaAnalitica, SubGrupo } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {

  private baseURL = APP_CONFIG.baseURL +'api/fin_conta_analitica/';
  private baseSubGrupo = APP_CONFIG.baseURL +'api/fin_subgrupo_contas/';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  createPlanoContas(value: { cod_empresa: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
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

  updatePlanoContas(id: number, value: { cod_empresa: number; desc_conta: string; cod_subgrupo_contas: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo PUT
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});

    return this.http.put(this.baseURL + id + '/', value, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listPlanoContas(): Observable<ContaAnalitica[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<ContaAnalitica[]>(this.baseURL + '?cod_empresa=' + this.authService.getCurrentCod_empresa(), { headers });
  }

  buscarPlanoContasPorId(id: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    //trazer os dados de uma unica instancia
    return this.http.get<ContaAnalitica>(this.baseURL + '?cod_conta_analitica=' + id, { headers })
  }

  deletePlanoContas(id: number) {
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

  listSubGrupoContas(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});

    // Retorna um Observable contendo todas as instancias da API
    return this.http.get<SubGrupo[]>(this.baseSubGrupo, { headers});
  }
}
