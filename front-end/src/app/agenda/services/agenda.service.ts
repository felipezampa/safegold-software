import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Agenda } from 'src/app/shared';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tipoUrl = APP_CONFIG.baseURL + 'api/ag_tipo/';
  private funcaoGestorUrl = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  salvarAgenda(data: any) {
    return this.http.post('http://localhost:3000/Agenda', data)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listarAgenda(): Observable<any> {
    return this.http.get('http://localhost:3000/Agenda');
  }

  procurarAgenda(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/Agenda/' + id);
  }

  updateAgenda(id: number, data: Agenda) {
    return this.http.put('http://localhost:3000/Agenda/' + id, data)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  excluirAgenda(id: number) {
    return this.http.delete('http://localhost:3000/Agenda/' + id)
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.funcaoGestorUrl + idGestor, { headers });
  }

  listTipo(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.tipoUrl, { headers });
  }
  
  /**  
   * @description 
   * Metodo simples que recebe um dia e retorna qual dia da semana esse é
   * Exemplo: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'
   * 
   * @param data uma data comum no formato yyyy-mm-dd 
   * 
   * @returns Retorna uma string do dia 'Quarta-Feira'
   */
  obterDia(data: Date): string | undefined {
    const dayOfWeek: number = data.getDay();
    const diaSemana = dayOfWeek;

    switch (diaSemana) {
      case 0: return 'Segunda-Feira';
      case 1: return 'Terça-Feira';
      case 2: return 'Quarta-Feira';
      case 3: return 'Quinta-Feira';
      case 4: return 'Sexta-Feira';
      case 5: return 'Sábado';
      case 6: return 'Domingo';
      default: return undefined;
    }
  }
}
