import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  getCurrentCod_empresa(): number {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');
    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentNome_empresa(){
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa: null;
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user_id : null;
  }
  getUsername() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).first_name : null;
  }
  getCurrentProjeto(){
    const CurrentProjeto = localStorage.getItem('selectedEmpresa');
    return CurrentProjeto ? JSON.parse(CurrentProjeto).cod_projeto: null;
  }

}
