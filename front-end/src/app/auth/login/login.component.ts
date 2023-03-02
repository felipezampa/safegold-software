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
export class LoginComponent{
  private jwtHelper = new JwtHelperService();

  username: string;
  password: string;

  myform: FormGroup;
  constructor(private authService: AuthService, private app: AppComponent, private router: Router, private appComponent: AppComponent, private cookieService: CookieService, private dashboardService: DashboardService) { }
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        const token = response.jwt;
        this.cookieService.set('jwt', token);

        this.dashboardService.getProjetos(this.authService.getCurrentUser()).subscribe(() => {
          this.router.navigate(['/dashboard']);

        });
      }
    );
  }




}
