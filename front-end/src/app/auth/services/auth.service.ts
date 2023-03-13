import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './../../dashboard/services/dashboard.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
=======
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})

export class AuthService {

<<<<<<< Updated upstream
  api_url: string = 'http://localhost:8000/';
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private dashboardService: DashboardService) { }

  login(username:string, password:string){
    return this.http.post<any>(this.api_url + `accounts/api/auth/`,
    {username, password}, httpOptions).pipe(
      map(user => {
        if (user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.dashboardService.getProjetos(user.user_id).subscribe(() => {
            this.router.navigate(['/dashboard']);
          });
        }
        return user;
      })
    );
  }

=======
  private token: string;
  private decodeToken: any;
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:8000/api/login/';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { 
    this.token = this.cookieService.get('jwt');
    if(this.jwtHelper.decodeToken(this.token) != null){
      this.decodeToken = this.jwtHelper.decodeToken(this.token);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password })
  }

  logout(){
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
        this.router.navigate(['login']);
      }
    })
  }

  // LOCALSTORAGE
>>>>>>> Stashed changes
  getCurrentCod_empresa(): number {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');
    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentNome_empresa(): string{
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa: null;
  }

<<<<<<< Updated upstream
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user_id : null;
  }
  getUsername() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).first_name : null;
  }
=======
>>>>>>> Stashed changes
  getCurrentProjeto(){
    const CurrentProjeto = localStorage.getItem('selectedEmpresa');
    return CurrentProjeto ? JSON.parse(CurrentProjeto).cod_projeto: null;
  }

<<<<<<< Updated upstream
=======
  // JWT
  getCurrentUser(): number {
    const userID = this.decodeToken.id_user;
    return userID;
  }

  getUsername(): string {
    const username = this.decodeToken.username;
    return username
  }

  getUserAcessoFin(): boolean{
    const acesso_fin = this.decodeToken.acesso_financeiro;
    return acesso_fin;
  }

  getUserAcessoAv(): boolean{
    const acesso_av = this.decodeToken.acesso_avaliacao;
    return acesso_av
  }

  getUserisHead(): boolean{
    const head_de_area = this.decodeToken.head_de_area;
    return head_de_area
  }

  getIsSuperUser(): boolean{
    const is_superuser = this.decodeToken.is_superuser
    return is_superuser
  }

  getCargoUser(): string {
    const cargo = this.decodeToken.cargo.nome_cargo
    return cargo
  }

  isLoggedIn(): boolean{
    return this.token !== null || this.token !== '' ? false : true;
  }

  // OUTROS
  CanActivate(): boolean{
    if(this.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/login']);
      return false
    }
  }
>>>>>>> Stashed changes
}
