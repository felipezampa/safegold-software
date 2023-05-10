import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sub-grupo-conta',
  templateUrl: './sub-grupo-conta.component.html',
  styleUrls: ['./sub-grupo-conta.component.css']
})
export class SubGrupoContaComponent {

  @Output() adicionarLinhaEvent = new EventEmitter<any>();
  @Output() editarLinhaEvent = new EventEmitter<any>();
  @Output() excluirLinhaEvent = new EventEmitter<any>();

  adicionar(){
    this.adicionarLinhaEvent.emit();
  }
  editar() {
    this.editarLinhaEvent.emit();
  }
  excluir() {
    this.excluirLinhaEvent.emit();
  }
}
