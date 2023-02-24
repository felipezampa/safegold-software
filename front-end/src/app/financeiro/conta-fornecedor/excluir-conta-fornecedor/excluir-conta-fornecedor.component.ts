import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrizAnalitica } from 'src/app/shared';
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

  excluirEmpresa(id: number) {
    this.matrizService.deleteEmpresa(id).subscribe();
    this.activeModal.close();
  }
}
