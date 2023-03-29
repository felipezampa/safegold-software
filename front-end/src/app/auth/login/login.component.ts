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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
        const token = response.jwt;
        this.cookieService.set('jwt', token);
        this.dashboardService.getProjetos(this.authService.getCurrentUser()).subscribe(() => {
          this.router.navigate(['/dashboard']);
          //exibe um alerta de sucesso e redireciona para a página de dashboard
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Login realizado com sucesso',
          //   timer: 1000,
          //   showConfirmButton: false
          // }).then(() => {
          //   this.router.navigate(['/dashboard']);
          // });
        });
      },
      error => {
        // exibe um alerta de erro
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






