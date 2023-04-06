import Swal from 'sweetalert2';
import { DashboardService } from './../../dashboard/services/dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators'
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  myform: FormGroup;
  error: string = '';
  token = '';


  user: any = {};




  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {

          this.token = data.token;
          this.authService.getUserInfo(this.token).subscribe(
            user => {
              this.authService.setUser(user); // armazenando o objeto do usuário no UserService
              sessionStorage.setItem('user', JSON.stringify(user));

              this.router.navigate(['/dashboard']);
            }

          );
        });
      },
      error => {
        //exibe um alerta de erro
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: 'Usuário ou senha incorretos',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
      }
    );

  }
}





// onSubmit() {
//   this.authService.login(this.username, this.password).subscribe(
//     response => {
//       //exibe um alerta de sucesso e redireciona para a página de dashboard
//       Swal.fire({
//         icon: 'success',
//         title: 'Login realizado com sucesso',
//         timer: 1000,
//         showConfirmButton: false
//       }).then(() => {
//         this.router.navigate(['/dashboard']);
//         console.log(this.authService.getUsername());
//         const token = response.jwt;
//         localStorage.setItem('token', token);
//       });
//       // const navigationExtras: NavigationExtras = {
//       //   queryParams: { id },
//       // };
//       // this.router.navigate(['/dashboard']);
//       // console.log(this.authService.getUsername());
//     },
//     error => {
//       // exibe um alerta de erro
//       Swal.fire({
//         icon: 'error',
//         title: 'Erro ao fazer login',
//         text: 'Usuário ou senha incorretos',
//         confirmButtonColor: '#EDA900',
//         confirmButtonText: 'Ok'
//       });
//     }
//   );
// }
