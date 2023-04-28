import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalFacade } from 'src/app/shared';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  myform!: FormGroup;
  error: string = '';
  token = '';
  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        if (data) {
          SwalFacade.sucesso("Login realizado com sucesso")
            .then(() => {
              this.token = data.token;
              this.authService.getUserInfo(this.token).subscribe(
                user => {
                  this.authService.setUser(user); // armazenando o objeto do usuário no UserService
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.router.navigate(['/dashboard']);
                }
              );
            });
        } else {
          SwalFacade.erro("Erro ao fazer login", "Usuário ou senha incorretos");
        }
      }
    )
  }
}