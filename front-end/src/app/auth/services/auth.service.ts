import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from 'src/app/shared';
import Swal from 'sweetalert2';


const httpOptions = {

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = APP_CONFIG.baseURL +'login/';
  private jwtHelper = new JwtHelperService();
  private jwtToken: string;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.jwtToken = this.cookieService.get('jwt');
  }

  login(username: string, password: string): Observable<any> {
    console.log(this.apiUrl);   
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        const token = response.jwt;
        const payload = JSON.stringify({
          id: response.id,
          username: response.username,
          email: response.email,
          is_superuser: response.is_superuser
        });
        this.cookieService.deleteAll()
        this.cookieService.set('jwt', token);
        this.cookieService.set('payload', payload);
        return response;
      })
    );
  }

  logout() {
    /**
     * Funcao de Logout
     * apresenta o Swal com o select
     */
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#EDA900'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookieService.deleteAll();
        this.deleteAllCookies()
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
      }
    })
  }

  // -------------- LS --------------
  getCurrentCod_empresa(): number {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');
    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentNome_empresa() {
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa : null;
  }

  getCurrentProjeto() {
    const CurrentProjeto = localStorage.getItem('selectedEmpresa');
    return CurrentProjeto ? JSON.parse(CurrentProjeto).cod_projeto : null;
  }

  // -------------- JWT --------------
  getCurrentUser() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const userID = decodeToken.id;
    return userID
  }
  getUsername() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const username = decodeToken.username;
    console.log('getUsername-> '+username);
    return username
  }
  getUserAcessoFin(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const acesso_fin = decodeToken.acesso_financeiro;
    console.log('getUserAcessoFin-> '+acesso_fin);
    
    return acesso_fin
  }
  getUserAcessoAv(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const acesso_av = decodeToken.acesso_avaliacao;
    console.log('getUserAcessoAv-> '+acesso_av);
    return acesso_av

  }
  getUserisHead(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const head_de_area = decodeToken.head_de_area;
    console.log('getUserisHead-> '+head_de_area);
    return head_de_area
  }

  getIsSuperUser() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const is_superuser = decodeToken.is_superuser
    console.log('getIsSuperUser-> '+is_superuser);
    return is_superuser
  }
  getCargoUser(): string {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const cargo = decodeToken.cargo.nome_cargo
    console.log('getCargoUser-> '+cargo);
    return cargo
  }

  isLoggedIn() {
    const token = this.cookieService.get('jwt');
    return token !== null && token !== '';
  }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
      return false;
    }
  }

  setOrDeleteCookie(name: string, value?: string) {
    if (value) {
      this.cookieService.set(name, value);
    } else {
      this.cookieService.delete(name);
    }
  }

  deleteAllCookies() {
    const cookies: {} = this.cookieService.getAll();
    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.cookieService.delete(cookieName);
      }
    }
  }
}
