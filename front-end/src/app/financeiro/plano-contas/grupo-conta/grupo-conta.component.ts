import { Component, EventEmitter, Output } from '@angular/core';
import { SubGrupoContaComponent } from '../sub-grupo-conta/sub-grupo-conta.component';

@Component({
  selector: 'app-grupo-conta',
  templateUrl: './grupo-conta.component.html',
  styleUrls: ['./grupo-conta.component.css']
})
export class GrupoContaComponent {


  subgrupos: any[] = [];

  adicionarSubGrupo() {
    const novoCard = new SubGrupoContaComponent;
    this.subgrupos.push(novoCard);
    // let i = this.subgrupos.length;
    
    // this.subgrupos[i].cards.push(novoCard);
  }

  editarSubGrupo() {
    //     const novoCard = {};
    // this.diasSemana[indexDia].cards.push(novoCard);
  }

  excluirSubGrupo() {
    // this.excluirLinhaEvent.emit();
  }
}
