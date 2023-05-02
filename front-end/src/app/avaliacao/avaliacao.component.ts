import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  isSuperuser!: boolean;
  currentUser!: boolean;
  isHead!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isSuperuser = this.authService.getIsSuperUser();
    this.isHead = this.authService.getUserisHead();
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (this.authService.getCurrentUser() != null) {
      this.currentUser = true;
    } else {
      this.currentUser = false;
    }
  }
  
  logout() {
    this.authService.logout();
  }

}
