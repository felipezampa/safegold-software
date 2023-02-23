import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../services/empresa.service';
import { ProjetoService } from '../../projeto';
import { Empresa } from 'src/app/shared';

@Component({
  selector: 'app-inserir-editar-empresa',
  templateUrl: './inserir-editar-empresa.component.html',
  styleUrls: ['./inserir-editar-empresa.component.css']
})
export class InserirEditarEmpresaComponent {

  @ViewChild('formEmpresas') formEmpresas!: NgForm;
  @Input() idEmpresa: number;
  @Input() editMode!: boolean;
  empresas: Empresa[] = [];
  mensagemErro: string = '';
  projetos_unicos: any [];
  projetos: any[];
  constructor(public activeModal: NgbActiveModal, private empresaService: EmpresaService, private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.listarEmpresas();
    this.atualizarEmpresa();
  }

  SalvarForm(dataForm: { cod_projeto: number; empresa: string; cnpj: string; safegold_ger: number }) {
    // Força o parsing do safegold_Ger para numero caso venha em string por engano
    Number(dataForm.safegold_ger);
    if (!this.editMode) {
      // CADASTRANDO
      try {
        // Testa se os parametros nao estao vazios
        if (dataForm.cod_projeto && dataForm.empresa !== '' && dataForm.cnpj !== '') {
          // Insere os dados na API, limpa o form e fecha o modal
          this.empresaService.createEmpresa(dataForm).subscribe();
          this.formEmpresas.reset();
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
        if (dataForm.cod_projeto && dataForm.empresa !== '' && dataForm.cnpj !== '') {
          // Insere os dados na API, limpa o form e fecha o modal
          this.empresaService.updateEmpresa(this.idEmpresa, dataForm).subscribe();
          this.formEmpresas.reset();
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

  atualizarEmpresa() {
    // Verifica se a flag de edicao eh verdadeira, ou seja se o action eh edicao e nao cadastro
    if (this.editMode == true) {
      try {
        // Testa se o id da empresa existe
        if (this.idEmpresa != undefined) {
          // Busca o objeto empresa com o ID passado
          this.empresaService.buscarEmpresaPorId(this.idEmpresa).subscribe(empresa => {
            // Coloca os valores encontrados no objeto nos campos do form
            this.formEmpresas.setValue({
              // O observable retorna um array, entao eh preciso acessar a posicao [0] para nao vir valores como undefined
              cnpj: empresa[0].cnpj,
              empresa: empresa[0].empresa,
              cod_projeto: empresa[0].cod_projeto,
              safegold_ger: empresa[0].safegold_ger
            });
          });
        } else {
          // Caso não encontrado então levanta uma excecão
          throw new Error("Empresa não encontrada: id = " + this.idEmpresa);
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
      this.getUniqueProjetos()
    });
  }
  getUniqueProjetos() {
    this.projetos_unicos = [];
    this.empresas.forEach((empresas) => {
      if (!this.projetos_unicos.find(p => p.cod_projeto === empresas.cod_projeto)) {
        this.projetos_unicos.push(empresas);
      }
    });
  }
}
