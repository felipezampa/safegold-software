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

  get f() {
    return this.myform.controls;
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
