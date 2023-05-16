import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrizAnalitica, SwalFacade } from 'src/app/shared';
import { MatrizContaFornecedorService } from '../services/matriz-conta-fornecedor.service';

@Component({
  selector: 'app-excluir-conta-fornecedor',
  templateUrl: './excluir-conta-fornecedor.component.html',
  styleUrls: ['./excluir-conta-fornecedor.component.css']
})
export class ExcluirContaFornecedorComponent implements OnInit {

  @Input() matriz!: MatrizAnalitica;

  constructor(public activeModal: NgbActiveModal, private matrizService: MatrizContaFornecedorService) { }

  ngOnInit(): void { }

  excluir(id: number) {
    this.matrizService.deleteVinculo(id).subscribe(
      {
        next: () => {
          this.activeModal.close();
        },
        error: () => {
          SwalFacade.erro("Ocorreu um erro ao tentar excluir", "Se o erro persistir entre em contato com o administrador");
        }
      }
    );
  }
}