import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from 'src/app/shared';
import Swal from 'sweetalert2';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const httpOptions = {

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/';

  token: string = '';
  private user: any = {};

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {

   }

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
    sessionStorage.removeItem('user')
    console.log(this.user);
    console.log('usuario apagado');
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

  // getCurrentUser() {
  //   const userID = this.user.id_user
  //   return userID
  // }
  // getUsername() {
  //   const username = this.user.username
  //   console.log('getUsername-> '+username);
  //   return username
  // }
  // getUserAcessoFin(): boolean {
  //   const acesso_fin = this.user.financeiro
  //   console.log('getUserAcessoFin-> '+acesso_fin);

  //   return acesso_fin
  // }
  // getUserAcessoAv(): boolean {
  //   const acesso_av = this.user.avaliacao
  //   console.log('getUserAcessoAv-> '+acesso_av);
  //   return acesso_av

  // }
  // getUserisHead(): boolean {
  //   const head_de_area = this.user.head_de_area
  //   console.log('getUserisHead-> '+head_de_area);
  //   return head_de_area
  // }

  // getIsSuperUser() {
  //   const is_superuser = this.user.superuser
  //   console.log('getIsSuperUser-> '+is_superuser);
  //   return is_superuser
  // }
  // getCargoUser(): string {
  //   const cargo = this.user.cargo
  //   console.log('getCargoUser-> '+cargo);
  //   return cargo
  // }
 getUsername() {
    const currentUser = sessionStorage.getItem('user');
    const username = currentUser ? JSON.parse(currentUser).first_name : null;
    console.log('getUserAcessoFin-> '+username);

    return username
}

  getCurrentUser() {
    const currentUser = sessionStorage.getItem('user');
    const userID = currentUser ? JSON.parse(currentUser).id_user : null;
    console.log('userID-> '+userID);

    return userID
  }

  getUserAcessoFin(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const acesso_fin = currentUser ? JSON.parse(currentUser).financeiro : null;
    console.log('getUserAcessoFin-> '+acesso_fin);

    return acesso_fin
  }
  getUserAcessoAv(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const acesso_av = currentUser ? JSON.parse(currentUser).avaliacao : null;
    console.log('getUserAcessoAv-> '+acesso_av);
    return acesso_av

  }
  getUserisHead(): boolean {
    const currentUser = sessionStorage.getItem('user');
    const head_de_area = currentUser ? JSON.parse(currentUser).head_de_area : null;
    console.log('getUserisHead-> '+head_de_area);
    return head_de_area
  }

  getIsSuperUser() {
    const currentUser = sessionStorage.getItem('user');
    const is_superuser = currentUser ? JSON.parse(currentUser).superuser : null;
    console.log('getIsSuperUser-> '+is_superuser);
    return is_superuser
  }
  getCargoUser(): string {
    const currentUser = sessionStorage.getItem('user');
    const cargo = currentUser ? JSON.parse(currentUser).cargo : null;
    console.log('getCargoUser-> '+cargo);
    return cargo
  }
}
