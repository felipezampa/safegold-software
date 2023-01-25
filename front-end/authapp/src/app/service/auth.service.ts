import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

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
  constructor(private http: HttpClient) { }

  login(username:string, password:string){
    return this.http.post<any>(this.api_url + `accounts/api/auth/`,
    {username, password}, httpOptions).pipe(
      map(user => {
        if (user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user));
          console.log('loginID: ', JSON.parse(localStorage.getItem('user_id')||'{}'));


        }
        return user;
      })

    );
  }
  logout(){
    localStorage.removeItem('currentUser');
  }
}
