import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Empresa, Projeto } from 'src/app/shared';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresas: Empresa[] = [];
  baseURL = 'http://127.0.0.1:8000/api/empresas/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application' });
  private _refreshPage$ = new Subject<void>();

  get refreshPage$() {
    return this._refreshPage$;
  }
  constructor(private http: HttpClient) { }

  createEmpresa(value: { cod_projeto: Projeto; empresa: string; cnpj: string; safegold_ger: number }): Observable<any> {
    console.log(value);
    
    // Retorna um Observable apos executar o metodo POST
    return this.http.post(this.baseURL, value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  updateEmpresa(id: number, value: { cod_projeto: Projeto; empresa: string; cnpj: string; safegold_ger: number }): Observable<any> {
    // Retorna um Observable apos executar o metodo PUT
    return this.http.put(this.baseURL + id + '/', value)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for atualizada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listEmpresas(): Observable<any> {
    // Retorna um Observable contendo todas as instancias da API 
    return this.http.get<Empresa[]>(this.baseURL, { headers: this.httpHeaders });
  }

  buscarEmpresaPorId(id: number): Observable<any>{
    //trazer os dados de uma unica empresa
    return this.http.get<Empresa>(this.baseURL + '?cod_empresa=' + id, { headers: this.httpHeaders })
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
