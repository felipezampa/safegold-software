import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  firstName = 'felipe'
  showPassword: boolean = false;
  password!: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  logout() { }

  mostrarSenha() {
    this.showPassword = !this.showPassword;
    let tipoInput = document.getElementById('sg-senha');

    if (this.showPassword) {
      tipoInput?.setAttribute('type', 'text');
    } else {
      tipoInput?.setAttribute('type', 'password');
    }
  }

  salvar() { }
}
