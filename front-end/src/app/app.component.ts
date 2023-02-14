import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: boolean;

  constructor(private router: Router, private cookieService: CookieService) {
    this.setCurrentUser();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('currentUser')) {
          this.cookieService.set('previousUrl', event.url);
        }
      }

    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedEmpresa');
    this.cookieService.delete('previousUrl');
    this.router.navigate(['/login']);
    this.setCurrentUser();
  }



  setCurrentUser() {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = true;
    } else {
      this.currentUser = false;
    }
  }
}
