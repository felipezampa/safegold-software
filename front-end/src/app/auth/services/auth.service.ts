import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { DashboardService } from './../../dashboard/services/dashboard.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/login/';
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private dashboardService: DashboardService) { }
  private jwtHelper = new JwtHelperService();



  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password })

  }



  getCurrentCod_empresa(): number {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');
    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentNome_empresa(){
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa: null;
  }

  getCurrentUser() {
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const userID = decodeToken.id_user;

    return userID
  }
  getUsername() {
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const username = decodeToken.username;

    return username
  }
  getUserAcessoFin(): number{
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const acesso_fin = decodeToken.acesso_financeiro;
    console.log(acesso_fin);
    return acesso_fin

  }
  getUserAcessoAv(): number{
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const acesso_av = decodeToken.acesso_avaliacao;
    console.log(acesso_av);
    return acesso_av

  }
  getUserisHead(): number{
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const head_de_area = decodeToken.head_de_area;
    console.log(head_de_area);
    return head_de_area
  }

  getIsSuperUser(): string{
    const token = this.cookieService.get('jwt');

    const decodeToken = this.jwtHelper.decodeToken(token)
    const is_superuser = decodeToken.is_superuser
    return is_superuser
  }
  getCargoUser(): string {
    const token = this.cookieService.get('jwt');
    const decodeToken = this.jwtHelper.decodeToken(token)

    const cargo = decodeToken.cargo.nome_cargo
    console.log(cargo);

    return cargo
  }

  getCurrentProjeto(){
    const CurrentProjeto = localStorage.getItem('selectedEmpresa');
    return CurrentProjeto ? JSON.parse(CurrentProjeto).cod_projeto: null;
  }


}



  // login(username:string, password:string){
  //   return this.http.post<any>(this.api_url + `accounts/api/auth/`,
  //   {username, password}, httpOptions).pipe(
  //     map(user => {
  //       if (user && user.token){
  //         localStorage.setItem("currentUser", JSON.stringify(user));
  //         this.dashboardService.getProjetos(user.user_id).subscribe(() => {
  //           this.router.navigate(['/dashboard']);
  //         });
  //       }
  //       return user;
  //     })
  //   );
  // }
