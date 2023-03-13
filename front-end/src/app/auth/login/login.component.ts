import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;
  constructor(private authService: AuthService, private app: AppComponent, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard']);
    }
  }

<<<<<<< Updated upstream
  get f() {
    return this.myform.controls;
=======
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        const token = response.jwt;
        this.cookieService.set('jwt', token);

        this.dashboardService.getProjetos(this.authService.getCurrentUser()).subscribe(() => {
          // exibe um alerta de sucesso e redireciona para a página de dashboard
          Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso',
            timer: 1000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['../dashboard']);
          });
          this.router.navigate(['../dashboard']);
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
>>>>>>> Stashed changes
  }

  onSubmit() {
    this.authService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        if (data) {
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.app.setCurrentUser();
          this.appComponent.getProjetos(); // Starta o script de contexto
        } else{
          console.log("conta nao encontrada");
        }
      }
    )
  }


}
