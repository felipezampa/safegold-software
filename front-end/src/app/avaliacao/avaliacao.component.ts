import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  constructor(private cookieService:CookieService,private router: Router ) { }

  ngOnInit(): void {
  }
  logout() {
    this.cookieService.delete('jwt','/','localhost',false,'Lax');
    this.router.navigate(['/login']);
  }

  setCurrentUser() {

  }
}
