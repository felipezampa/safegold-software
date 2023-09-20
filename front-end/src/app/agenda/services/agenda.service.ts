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
  private funcaoGestorUrl = APP_CONFIG.baseURL + 'api/ag_funcao_gestor/?id_user=';
  private agendaUrl = APP_CONFIG.baseURL + 'api/ag_agenda/';
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  get refreshPage$() {
    return this._refreshPage$;
  }

  salvarAgenda(data: any) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});
    return this.http.post(this.agendaUrl, data, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  listarAgenda(idUser: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser()});
    return this.http.get(this.agendaUrl + '?funcao_gestor__id_user=' + idUser, {headers}); // fazer o id_user ser dinamico depois
  }

  findAgenda(id: number): Observable<any> {
    return this.http.get(this.agendaUrl + '?cod_agenda=' + id);
  }

  updateAgenda(id: number, data: any) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser()});
    return this.http.patch(this.agendaUrl + id + '/', data, {headers})
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  excluirAgenda(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application', Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.delete(this.agendaUrl + id + '/', { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    // arrumar pra trazer o ultimo funcaogestor quando um user tiver mais de um, se basear pela data fim null
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.funcaoGestorUrl + idGestor, { headers });
  }

  listFuncaoGestor(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.funcaoGestorUrl, { headers });
  }

  listTipo(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.tipoUrl, { headers });
  }
  
  findTipo(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.tipoUrl + '?id_tipo=' + id, { headers });
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
