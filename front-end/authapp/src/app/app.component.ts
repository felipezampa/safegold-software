import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema de Login -- Teste';
  user:any;
  constructor(private authService: AuthService) {}
  ngOnInit(){
    try{
      this.user=JSON.parse(localStorage.getItem("currentUser") || '{}');
    }catch(error){}
  }

  logout(){
    this.authService.logout();
  }
}
