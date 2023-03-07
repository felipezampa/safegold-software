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
  is_superuser: boolean;

  constructor(private cookieService:CookieService,private router: Router, private authServive: AuthService ) { }

  ngOnInit(): void {
  this.is_superuser = this.authServive.getIsSuperUser();

  }
  logout() {
    Swal.fire({
      title: 'Tem certeza que deseja sair ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed){
      this.cookieService.delete('jwt','/','localhost',false,'Lax');
      this.cookieService.delete('jwt','/financeiro','localhost',false,'Lax')
      localStorage.removeItem('selectedEmpresa')
      this.router.navigate(['/login']);

      }
    })
  }

  setCurrentUser() {

  }
}
