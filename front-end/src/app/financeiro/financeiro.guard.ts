import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth';
import { SwalFacade } from '../shared';
@Injectable({
  providedIn: 'root'
})
export class FinanceiroGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getUserAcessoFin()) {
      return true;
    } else {
      SwalFacade.erro('Acesso Negado','Você não tem acesso a essa página')
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

}
