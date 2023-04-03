import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { DashboardService } from './../../dashboard/services/dashboard.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showErrorMessage: boolean = false;
  myform: FormGroup;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private dashboardService: DashboardService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.showErrorMessage = true;
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        //exibe um alerta de sucesso e redireciona para a página de dashboard
        Swal.fire({
          icon: 'success',
          title: 'Login realizado com sucesso',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/dashboard']);
          console.log(this.authService.getUsername());
          const token = response.jwt;
          localStorage.setItem('token', token);
        });
        // const navigationExtras: NavigationExtras = {
        //   queryParams: { id },
        // };
        // this.router.navigate(['/dashboard']);
        // console.log(this.authService.getUsername());
      },
      error => {
        // exibe um alerta de erro
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: 'Usuário ou senha incorretos',
          confirmButtonColor: '#EDA900',
          confirmButtonText: 'Ok'
        });
      }
    );
  }
}







