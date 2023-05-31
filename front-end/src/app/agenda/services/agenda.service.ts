import { Injectable } from '@angular/core';
import { APP_CONFIG } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { AuthService } from 'src/app/auth';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private tipoUrl = APP_CONFIG.baseURL + 'api/ag_tipo/';
  private funcaoGestorUrl = APP_CONFIG.baseURL + 'api/sg_funcao_gestor/?id_user=';

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveAgenda(data: any) {
    return this.http.post('http://localhost:3000/Agenda', data);
  }

  updateAgenda(data: any) {
    // IMPLEMENTAR NO FUTURO
  }
  excluirAgenda() {
    // IMPLEMENTAR NO FUTURO
  }

  getFuncaoGestor(idGestor: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.funcaoGestorUrl + idGestor, { headers });
  }

  listTipo(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Token ' + this.authService.getTokenUser() });
    return this.http.get(this.tipoUrl, { headers });
  }
  TESTEAGENDA(): Observable<any>{
    return this.http.get('http://localhost:3000/Agenda');
  }

  listAgendaHistorico(): Observable<any>{
    // temporario usando o of pra criar um observable
    return of(
      [
      { data: "2023-06-07", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-06-06", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-06-05", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-06-02", dia: "Sexta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-06-01", dia: "Quinta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-05-31", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "POLICIA FEDERAL", horas: 8, atendimento: "Presencial" },
      { data: "2023-05-30", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-29", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "CORRUPCAUM", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-26", dia: "Sexta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "FARIMAX", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-25", dia: "Quinta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-24", dia: "Quarta-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "NOMA", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-23", dia: "Terça-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "AMERICANAS", horas: 8, atendimento: "Remoto" },
      { data: "2023-05-22", dia: "Segunda-Feira", unidade: "Safegold Perfomance", area: "BI", funcao: "DEV", gestor: "Sergio Moro", tipo: "Projeto", projeto: "HAVAN", horas: 8, atendimento: "Remoto" },
      ]
    );
  }
}
