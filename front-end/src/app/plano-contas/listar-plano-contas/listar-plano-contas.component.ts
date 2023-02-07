import { Component, OnInit } from '@angular/core';
import { PlanoContasService } from '../services/plano-contas.service';

@Component({
  selector: 'app-listar-plano-contas',
  templateUrl: './listar-plano-contas.component.html',
  styleUrls: ['./listar-plano-contas.component.css']
})
export class ListarPlanoContasComponent implements OnInit {

  planoContas: any[] = [];
  isLoading: boolean = false;

  constructor(private planoContasService: PlanoContasService,) { }

  ngOnInit(): void {
  }
  
  abrirFormCadastro(){ }
  salvarExcel(){ }
  salvarPDF(){ }
  verModalEmpresa(empresa: any){}
  abrirFormAtualizacao(empresa: number){}
  deletarModalEmpresa(empresa: any){}
}
