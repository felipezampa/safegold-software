import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalFacade } from 'src/app/shared';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  showPassword: boolean = false;
  myform!: FormGroup;
  error: string = '';
  token = '';
  user: any = {};
  isLoading!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
   }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (data) => {
          if (data.token != null) { // verifica se a resposta HTTP tem status 200 (OK)
            SwalFacade.sucesso("Login realizado com sucesso")
              .then(() => {
                this.token = data.token;
                this.authService.getUserInfo(this.token).subscribe(
                  user => {
                    this.authService.setUser(user); // armazenando o objeto do usuário no UserService
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.router.navigate(['/dashboard']);
                    this.isLoading = false;
                  }
                );
              });
          } else {
            SwalFacade.erro("Erro ao fazer login", "Usuário ou senha incorretos");
            this.isLoading = false;
          }
        },
        error: () => {
          SwalFacade.erro("Erro ao fazer login", "Problema no servidor");
          this.isLoading = false;
        }
      })
  }


  mostrarSenha() {
    this.showPassword = !this.showPassword;
    let tipoInput = document.getElementById('sg-senha');

    if (this.showPassword) {
      tipoInput?.setAttribute('type', 'text');
    } else {
      tipoInput?.setAttribute('type', 'password');
    }
  }
}
