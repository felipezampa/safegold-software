import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContaAnalitica } from 'src/app/shared';
import { PlanoContasService } from '../services/plano-contas.service';


@Component({
  selector: 'app-excluir-plano-contas',
  templateUrl: './excluir-plano-contas.component.html',
  styleUrls: ['./excluir-plano-contas.component.css']
})
export class ExcluirPlanoContasComponent implements OnInit {

  @Input() conta!: ContaAnalitica;

  constructor(public activeModal: NgbActiveModal, private service: PlanoContasService) { }

  ngOnInit(): void {
  }

  excluir(id: number) {
    this.service.deletePlanoContas(id).subscribe();
    this.activeModal.close();
  }
}
