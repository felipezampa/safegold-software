import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/shared';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {

  @Input() empresa!: Empresa;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
