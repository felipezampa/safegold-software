import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from 'src/app/financeiro/projeto';
import { Estado, SegmentoProjeto, SwalFacade, ViaCEP } from 'src/app/shared';

@Component({
  selector: 'app-inserir-projeto',
  templateUrl: './inserir-projeto.component.html',
  styleUrls: ['./inserir-projeto.component.css']
})
export class InserirProjetoComponent implements OnInit{

  @ViewChild('formProjeto') formProjeto!: NgForm;
  segmentos!: SegmentoProjeto[];
  estados!: Estado[];

  estadoEndereco!: string;
  cidadeEndereco!: string;
  cepEndereco!: number;
  nomeProjeto!: number;

  constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) {}

  ngOnInit(): void {
    this.listarSegmentos();
    this.listarEstados();
    this.estadoEndereco = 'PR';
  }

  salvar(){
    console.log(this.formProjeto.value);
    if(this.nomeProjeto != null){
      this.projetoService.create(this.formProjeto.value).subscribe();
      SwalFacade.sucesso("Agenda salva com sucesso!");
      this.activeModal.close();
    } else {
      SwalFacade.alerta("Erro ao salvar", "Por favor digite o nome do projeto")
    }
  }

  listarSegmentos() {
    this.projetoService.listSegmentos().subscribe({
      next: (seg: SegmentoProjeto[]) => {
        this.segmentos = seg;
        this.segmentos.sort((a, b) => (a.segmento ?? '').localeCompare(b.segmento ?? ''));
      }
    })
  }

  listarEstados() {
    this.projetoService.listEstados().subscribe({
      next: (est: Estado[]) => {
        this.estados = est;
        this.estados.sort((a, b) => (a.uf ?? '').localeCompare(b.uf ?? ''));
      }
    })
  }

  preencherEndereco() {
    this.projetoService.getEndereco(this.cepEndereco).subscribe({
      next: (cep: ViaCEP) => {
        this.cidadeEndereco = cep.localidade,
        this.estadoEndereco = cep.uf
      }
    })
  }
}
