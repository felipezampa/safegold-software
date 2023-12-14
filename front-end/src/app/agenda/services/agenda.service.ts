import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { APP_CONFIG, Agenda } from 'src/app/shared';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tipoUrl!: string;
  private funcaoGestorUrl!: string;
  private agendaUrl!: string;
  private headers!: HttpHeaders;
  private _refreshPage$ = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser(), 'Content-Type': 'application' });
    this.tipoUrl = APP_CONFIG.baseURL + 'api/ag_tipo/';
    this.funcaoGestorUrl = APP_CONFIG.baseURL + 'api/ag_funcao_gestor/?id_user=';
    this.agendaUrl = APP_CONFIG.baseURL + 'api/ag_agenda/';
  }

  get refreshPage$() {
    return this._refreshPage$;
  }

  
  /**
   * @description Salva uma nova agenda no servidor.
   * @param data Os dados da agenda a serem salvos.
   * @returns Observable que representa a resposta da requisição.
   */
  saveAgenda(data: any) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.post(this.agendaUrl, data, { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }


  /**
   * @description Lista as agendas do usuário com o ID fornecido.
   * @param idUser O ID do usuário para o qual as agendas devem ser listadas.
   * @returns Observable que representa a resposta da requisição de listagem de agendas.
   */
  listAgenda(idUser: number): Observable<any> {
    // tive que passar -1 quando seleciona todos pois dava erro quando era null
    if (idUser > 0) {
      // Lista a agenda especifica de cada usuario
      return this.http.get(this.agendaUrl + '?funcao_gestor__id_user=' + idUser, { headers: this.headers });
    } else {
      // Lista a agenda de todos
      return this.http.get(this.agendaUrl, { headers: this.headers });
    }
  }


  /**
   * @description Busca uma agenda com o ID fornecido.
   * @param id O ID da agenda a ser buscada.
   * @returns Observable que representa a resposta da requisição de busca da agenda.
   */
  findAgenda(id: number): Observable<any> {
    return this.http.get(this.agendaUrl + '?cod_agenda=' + id);
  }


  /**
   * @description Atualiza uma agenda com o ID fornecido.
   * @param id O ID da agenda a ser atualizada.
   * @param data Os novos dados a serem aplicados na agenda.
   * @returns Observable que representa a resposta da requisição de atualização da agenda.
   */
  updateAgenda(id: number, data: any) {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.patch(this.agendaUrl + id + '/', data, { headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }


  /**
   * @description Exclui uma agenda com o ID fornecido.
   * @param id O ID da agenda a ser excluída.
   * @returns Observable que representa a resposta da requisição de exclusão da agenda.
   */
  excluirAgenda(id: number) {
    return this.http.delete(this.agendaUrl + id + '/', { headers: this.headers })
      // Essa parte abaixo é responsável por atualizar a página quando uma instancia for criada
      .pipe(
        tap(() => {
          this.refreshPage$.next();
        })
      );
  }


  /**
   * @description Obtém informações sobre a função do gestor com o ID fornecido.
   * @param idGestor O ID do gestor para o qual as informações da função devem ser obtidas.
   * @returns Observable que representa a resposta da requisição de obtenção das informações da função do gestor.
   */
  getFuncaoGestor(idGestor: number): Observable<any> {
    return this.http.get(this.funcaoGestorUrl + idGestor, { headers: this.headers });
  }


  /**
   * @description Lista as funções dos gestores disponíveis.
   * @returns Observable que representa a resposta da requisição de listagem das funções dos gestores.
   */
  listFuncaoGestor(): Observable<any> {
    return this.http.get(this.funcaoGestorUrl, { headers: this.headers });
  }


  /**
   * @description Lista os tipos disponíveis.
   * @returns Observable que representa a resposta da requisição de listagem dos tipos.
   */
  listTipo(): Observable<any> {
    return this.http.get(this.tipoUrl, { headers: this.headers });
  }


  /**
   * @description Busca um tipo com o ID fornecido.
   * @param id O ID do tipo a ser buscado.
   * @returns Observable que representa a resposta da requisição de busca do tipo.
   */
  findTipo(id: number): Observable<any> {
    return this.http.get(this.tipoUrl + '?id_tipo=' + id, { headers: this.headers });
  }


  /**  
   * @description Metodo simples que recebe um dia e retorna qual 
   * dia da semana ele é.
   * Ex: Uma data 2023-06-07 irá retornar a string 'Quarta-Feira'.
   * @param data uma data comum no formato yyyy-mm-dd. 
   * @returns String do dia Ex: 'Quarta-Feira'.
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
