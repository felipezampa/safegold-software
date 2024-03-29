import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Estado, Projeto, SegmentoProjeto, SwalFacade } from 'src/app/shared';

@Component({
  selector: 'app-inserir-projeto',
  templateUrl: './inserir-projeto.component.html',
  styleUrls: ['./inserir-projeto.component.css']
})
export class InserirProjetoComponent implements OnInit{

  @ViewChild('formProjeto') formProjeto!: NgForm;
  projeto!: Projeto;
  segmentos!: SegmentoProjeto[];
  estados!: Estado[];

  constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) {}

  ngOnInit(): void {
    this.projeto = new Projeto();
    this.listSegmentos();
    this.listEstados();
  }


  /**
   * @description Salva o projeto, verificando se o nome do projeto foi preenchido.
   */
  saveProjeto(){
    if(this.projeto.projeto != null){
      this.projetoService.create(this.projeto).subscribe();
      SwalFacade.sucesso("Agenda salva com sucesso!");
      this.activeModal.close();
    } else {
      SwalFacade.alerta("Erro ao salvar", "Por favor digite o nome do projeto")
    }
  }


  /**
   * @description Lista os segmentos de projeto disponíveis.
   */
  listSegmentos() {
    this.projetoService.listSegmentos().subscribe({
      next: (seg: SegmentoProjeto[]) => {
        this.segmentos = seg;
        this.segmentos.sort((a, b) => (a.segmento ?? '').localeCompare(b.segmento ?? ''));
      }
    })
  }


  /**
   * @description Lista os estados disponíveis.
   */
  listEstados() {
    this.projetoService.listEstados().subscribe({
      next: (est: Estado[]) => {
        this.estados = est;
        this.estados.sort((a, b) => (a.uf ?? '').localeCompare(b.uf ?? ''));
      }
    })
  }


  /**
   * @description Insere o endereço no projeto, utilizando o CEP fornecido.
   */
  insertEndereco() {
    let cep = this.projeto.cep != undefined ? Number(this.projeto.cep) : 0
    
    this.projetoService.getEndereco(cep).subscribe({
      next: (cep) => {
        this.projeto.cidade = cep.localidade,
        this.projeto.estado = cep.uf
      }
    })
  }
}
