import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/shared';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-excluir-empresa',
  templateUrl: './excluir-empresa.component.html',
  styleUrls: ['./excluir-empresa.component.css']
})
export class ExcluirEmpresaComponent implements OnInit {

  @Input() empresa!: Empresa;

  constructor(public activeModal: NgbActiveModal, private empresaService: EmpresaService) { }

  ngOnInit(): void { }

  excluirEmpresa(id: number) {
    this.empresaService.deleteEmpresa(id).subscribe();
    this.activeModal.close();
  }
}
