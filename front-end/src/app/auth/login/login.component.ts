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
  constructor(private authService: AuthService, private app: AppComponent, private router:Router) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/empresas']);
  }
}

  get f() {
    return this.myform.controls;
  }

  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
        this.app.setCurrentUser();
      }
    )
  }


}
