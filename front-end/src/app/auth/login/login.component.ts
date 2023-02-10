import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  get f() {
    return this.myform.controls;
  }

  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        localStorage.setItem("currentUser", JSON.stringify(data));

      }
    )
  }


}
