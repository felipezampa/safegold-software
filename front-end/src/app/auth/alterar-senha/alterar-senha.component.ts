import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalFacade } from 'src/app/shared';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  new_password!: any;
  old_password!: any;
  confirm_password!: any;
  isLoading!: boolean;

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) { }

  ngOnInit() { this.isLoading = false; }

  mostrarSenha(fieldName: string) {
    const inputElement = document.getElementsByName(fieldName)[0] as HTMLInputElement;

    // Verifica se o elemento foi encontrado
    if (inputElement) {
      // Obtém o tipo atual do input (text ou password)
      const currentType = inputElement.type;
      // Altera o tipo do input
      inputElement.type = currentType === 'password' ? 'text' : 'password';
    }
  }

  salvar() {
    this.isLoading = true;
    if (this.new_password == this.confirm_password) {
      this.authService.changePassword(this.old_password, this.new_password).subscribe({
        next: () => {
          SwalFacade.sucesso('Senha alterada com sucesso!')
          this.activeModal.close();
        },
        error: () => {
          this.isLoading = false;
          SwalFacade.erro('Ocorreu um erro ao salvar','A senha atual está errada!')
        }
      });
    } else {
      this.isLoading = false;
      SwalFacade.erro('Ocorreu um erro ao salvar', 'As senhas novas não coincidem')
    }
  }
}
