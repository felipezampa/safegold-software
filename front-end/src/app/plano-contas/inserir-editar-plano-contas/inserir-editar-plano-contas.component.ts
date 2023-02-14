import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/empresa';
import { Empresa, SubGrupo } from 'src/app/shared';
import { PlanoContasService } from '../services/plano-contas.service';

@Component({
  selector: 'app-inserir-editar-plano-contas',
  templateUrl: './inserir-editar-plano-contas.component.html',
  styleUrls: ['./inserir-editar-plano-contas.component.css']
})
export class InserirEditarPlanoContasComponent implements OnInit {

  @ViewChild('formPlanoContas') formPlanoContas!: NgForm;
  @Input() idConta: number;
  @Input() editMode!: boolean;
  empresas: Empresa[] = [];
  subgrupos: SubGrupo[] = [];
  mensagemErro: string = '';
  selectedCardCod_empresa: number;
  selectedCardEmpresa: string;
  constructor(public activeModal: NgbActiveModal, private empresaService: EmpresaService, private planoContasService: PlanoContasService, private route:ActivatedRoute) {
    this.selectedCardCod_empresa = this.getCurrentCod_empresa()
    this.selectedCardEmpresa = this.getCurrentNome_empresa()
  }
  ngOnInit(): void {
    this.listarEmpresas();
    this.listarSubGrupo();
    this.atualizarConta();


  }

  ////////////////////////////////////// GETS DO LOCAL STORAGE//////////////////////////////////////////
  getCurrentCod_empresa() {
    const CurrentEmpresa = localStorage.getItem('selectedEmpresa');

    return CurrentEmpresa ? JSON.parse(CurrentEmpresa).cod_empresa : null;
  }

  getCurrentNome_empresa(){
    const CurrentNome_empresa = localStorage.getItem('selectedEmpresa');
    return CurrentNome_empresa ? JSON.parse(CurrentNome_empresa).empresa: null;
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user_id : null;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  SalvarForm(dataForm: { cod_empresa: number; desc_conta: string; cod_subgrupo_contas: number }) {
    console.log(dataForm);


    if (!this.editMode) {
      // CADASTRANDO
      try {
        // Testa se os parametros nao estao vazios
        if (dataForm.cod_empresa && dataForm.desc_conta !== '' && dataForm.cod_subgrupo_contas) {
          // Insere os dados na API, limpa o form e fecha o modal
          this.planoContasService.createPlanoContas(dataForm).subscribe();
          this.formPlanoContas.reset();
          this.activeModal.close();
        } else {
          // Caso dados não estejam corretamente preenchidos então levanta uma excecão
          throw new Error('Por favor preencher todos os campos');
        }
      } catch (e) {
        //Mostra a exceção na tela
        this.mensagemErro = '<h4 class="alert alert-danger strong">' + e + '</h4>';
      }
    } else {
      // EDITANDO
      try {
        // Testa se os parametros nao estao vazios
        if (dataForm.cod_empresa && dataForm.desc_conta !== '' && dataForm.cod_subgrupo_contas) {
          // Insere os dados na API, limpa o form e fecha o modal
          this.planoContasService.updatePlanoContas(this.idConta, dataForm).subscribe();
          this.formPlanoContas.reset();
          this.activeModal.close();
        } else {
          // Caso dados não estejam corretamente preenchidos então levanta uma excecão
          throw new Error('Por favor preencher todos os campos');
        }
      } catch (e) {
        //Mostra a exceção na tela
        this.mensagemErro = '<h4 class="alert alert-danger strong">' + e + '</h4>';
      }
    }
  }

  atualizarConta() {
    // Verifica se a flag de edicao eh verdadeira, ou seja se o action eh edicao e nao cadastro
    if (this.editMode == true) {
      try {
        // Testa se o id da empresa existe
        if (this.idConta != undefined) {
          // Busca o objeto empresa com o ID passado
          this.planoContasService.buscarPlanoContasPorId(this.idConta).subscribe(conta => {
            // Coloca os valores encontrados no objeto nos campos do form
            this.formPlanoContas.setValue({
              // O observable retorna um array, entao eh preciso acessar a posicao [0] para nao vir valores como undefined
              cod_empresa: conta[0].cod_empresa,
              desc_conta: conta[0].desc_conta,
              cod_subgrupo_contas: conta[0].cod_subgrupo_contas
            });
          });
        } else {
          // Caso não encontrado então levanta uma excecão
          throw new Error("Empresa não encontrada: id = " + this.idConta);
        }
      } catch (e) {
        //Mostra a exceção na tela
        this.mensagemErro = '<h4 class="alert alert-danger strong">' + e + '</h4>';
      }
    }
  }

  listarEmpresas() {
    // Lista todos as empresas para selecionar no input de option
    this.empresaService.listEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  listarSubGrupo(){
    this.planoContasService.listSubGrupoContas().subscribe(subgrupo => {
      this.subgrupos = subgrupo;
    });
  }
}
