import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

const httpOptions = {

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/login/';
  private jwtHelper = new JwtHelperService();
  private jwtToken: string;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.jwtToken = this.cookieService.get('jwt');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password })
  }

  logout() {
    Swal.fire({
      title: 'Tem certeza que deseja sair ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookieService.delete('jwt', '/', 'localhost', false, 'Lax');
        this.cookieService.delete('jwt', '/financeiro', 'localhost', false, 'Lax')
        localStorage.removeItem('selectedEmpresa')
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
    const userID = decodeToken.id_user;
    return userID
  }
  getUsername() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const username = decodeToken.username;
    return username
  }
  getUserAcessoFin(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const acesso_fin = decodeToken.acesso_financeiro;
    return acesso_fin

  }
  getUserAcessoAv(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const acesso_av = decodeToken.acesso_avaliacao;
    return acesso_av

  }
  getUserisHead(): boolean {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const head_de_area = decodeToken.head_de_area;
    return head_de_area
  }

  getIsSuperUser() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const is_superuser = decodeToken.is_superuser
    return is_superuser
  }
  getCargoUser(): string {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken)
    const cargo = decodeToken.cargo.nome_cargo
    return cargo
  }

  isLoggedIn() {
    const token = this.cookieService.get('jwt');
    return token !== null && token !== '';
  }

  CanActivate(): boolean {
    if (this.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }

}