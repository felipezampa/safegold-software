import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = APP_CONFIG.baseURL + 'api/';
  private user: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { username, password };
    return this.http.post(this.baseUrl + 'login/', body, { headers });
  }

  getUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Token ' + token
    });
    return this.http.get(this.baseUrl + 'userlogado/', { headers });
  }

  logout(): void {
    this.user = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  isLoggedIn() {
    const session = sessionStorage.getItem('user');
    return session !== null && session !== '';
  }

  getCurrentNome_empresa() {
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa : null;
  }

  getCurrentCod_empresa(): number {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');
    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentProjeto() {
    const CurrentProjeto = localStorage.getItem('selectedEmpresa');
    return CurrentProjeto ? JSON.parse(CurrentProjeto).cod_projeto : null;
  }

  getUsername() {
    const currentUser = sessionStorage.getItem('user');
    const username = currentUser ? JSON.parse(currentUser).first_name : null;
    return username
  }

  getCurrentUser() {
    const currentUser = sessionStorage.getItem('user');
    const userID = currentUser ? JSON.parse(currentUser).id_user : null;
    return userID;
  }

  getUserAcessoFin(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const acesso_fin = currentUser ? JSON.parse(currentUser).financeiro : null;
    return acesso_fin;
  }

  getUserAcessoAv(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const acesso_av = currentUser ? JSON.parse(currentUser).avaliacao : null;
    return acesso_av;
  }

  getUserisHead(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const head_de_area = currentUser ? JSON.parse(currentUser).head_de_area : null;
    return head_de_area;
  }

  getIsSuperUser() {
    const currentUser = sessionStorage.getItem('user');
    const is_superuser = currentUser ? JSON.parse(currentUser).superuser : null;
    return is_superuser;
  }
  
  getTokenUser() {
    const currentUser = sessionStorage.getItem('user');
    const token = currentUser ? JSON.parse(currentUser).token : null;
    return token;
  }

  getCargoUser(): string {
    const currentUser = sessionStorage.getItem('user');
    const cargo = currentUser ? JSON.parse(currentUser).cargo : null;
    return cargo;
  }
}
