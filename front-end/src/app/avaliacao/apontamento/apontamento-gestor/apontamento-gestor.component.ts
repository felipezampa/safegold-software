import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Apontamento } from 'src/app/shared';
import { ApontamentoService } from '../services/apontamento.service';

@Component({
  selector: 'app-apontamento-gestor',
  templateUrl: './apontamento-gestor.component.html',
  styleUrls: ['./apontamento-gestor.component.css']
})
export class ApontamentoGestorComponent implements OnInit {

  @ViewChild('formApontamento') formApontamento!: NgForm;
  apontamentos: Apontamento[] = [];
  isLoading: boolean = false;
  editMode: boolean = false;
  currentApontamentoId?: number;
  subscription: Subscription | undefined;

  constructor( private apontamentoService: ApontamentoService ) { }

  ngOnInit(): void {
    this.listarApontamento();
    this.subscription = this.apontamentoService.refreshPage$.subscribe(() => {
      this.listarApontamento();
    })
  }

  listarApontamento() {
    // Flag para mostrar dados carregando
    this.isLoading = true;
    // Metodo para listar todos os apontamentos do BD
    this.apontamentoService.listApontamento()
      .subscribe(apontamento => {
        //altera a flag para tirar a info de carregamento
        this.isLoading = false;
        //seta no array da instancia os apontamentos recebidos
        this.apontamentos = apontamento;
      });
  }

  atualizarApontamento(id: number) {
    // Seta a variavel da instancia para quando salvar o form utilizar no metodo put
    this.currentApontamentoId = id;
    // Procura o objeto com o ID igual ao da tabela
    let currentApontamento = this.apontamentos.find((apt) => { return apt.id == id });
    // Seta os valores encontrados no objeto nos campos do form
    this.formApontamento.setValue({
      story_id: currentApontamento?.story_id,
      data_apto: currentApontamento?.data_apto,
      vlr_apto: currentApontamento?.vlr_apto
    });
    // Altera flag para quando salvar o form editar ao invés de criar duplicado
    this.editMode = true;
  }

  deletarApontamento(id: number) {
    // Texto para confirmar a exclusao
    let text = `Deseja realmente excluir o apontamento ID: ${id}?`;
    // Testa com a função pronta do browser se o objeto selecionado deseja ser excluido
    if (confirm(text) == true) {
      this.apontamentoService.deleteApontamento(id).subscribe();
    } else {
      alert('Operação cancelada');
    }
  }

  SalvarForm(postData: { story_id: string; data_apto: Date; vlr_apto: number }) {
    // Faz o teste se a flag de edicao esta ativada
    if (!this.editMode) {
      // caso falso, faz a insercao 
      this.apontamentoService.createApontamento(postData).subscribe();
    } else {
      // caso verdadeiro atualiza o dado existente e seta a flag para false
      this.apontamentoService.updateApontamento(this.currentApontamentoId, postData).subscribe();
      this.editMode = false;
    }
    this.formApontamento.reset();
  }

  clearForm() {
    // Metodo para limpar o formulario
    this.formApontamento.reset();
    // Tem que setar a flag para false, ou entao ao submeter dados novos ira fazer a atualizacao de qualquer apontamento que deixou o id no form
    this.editMode = false;
  }
}
