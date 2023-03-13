import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  isSuperuser: boolean;
  isHead: boolean;

  constructor(private cookieService: CookieService, private router: Router, private authServive: AuthService) { }

  ngOnInit(): void {
    this.isSuperuser = this.authServive.getIsSuperUser();
    this.isHead = this.authServive.getUserisHead();
  }
  logout() {
    this.authServive.logout();
  }

  setCurrentUser() {

  }


}
