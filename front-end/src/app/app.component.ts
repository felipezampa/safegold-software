import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: boolean;

  constructor(private router: Router) { this.setCurrentUser() }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = true;
    } else{
      this.currentUser = false;
    }
  }
}
