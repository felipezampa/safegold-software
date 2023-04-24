import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent {
  diasSemana: { index: number, nome: String, dia: String, cards: any[] }[] = [
    { index: 0, nome: 'Segunda-Feira', dia: '17/04', cards: [] },
    { index: 1, nome: 'Terça-Feira', dia: '18/04', cards: [] },
    { index: 2, nome: 'Quarta-Feira', dia: '19/04', cards: [] },
    { index: 3, nome: 'Quinta-Feira', dia: '20/04', cards: [] },
    { index: 4, nome: 'Sexta-Feira', dia: '21/04', cards: [] }
  ];
  diaInicio: Date = new Date('2023-04-17');
  diaFim: Date = new Date('2023-04-21');
  username!: String;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.criarPrimeiroCard()
  }


  verHistorico() {
    this.router.navigate(['historico'], { relativeTo: this.route });
    // modalRef.componentInstance.empresa = empresa;
  }

  criarPrimeiroCard() {
    for (let index = 0; index < this.diasSemana.length; index++) {
      this.adicionarProjeto(index);
    }
  }
  adicionarProjeto(dia: number) {
    this.diasSemana[dia].cards.push({});
  }

  removerProjeto(dia: number) {
    if (this.diasSemana[dia].cards.length > 1) {
      this.diasSemana[dia].cards.pop();
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Não foi possível excluir',
        text: 'O dia deve ter ao menos um compromisso!',
        confirmButtonColor: '#EDA900',
        confirmButtonText: 'Ok'
      });
    }
  }
  logout() {
    this.authService.logout();
  }




  adicionarCard(indexDia: number) {
    const novoCard = { /* novo card aqui */ };
    this.diasSemana[indexDia].cards.push(novoCard);
  }
  salvarCard(indexDia: number) {
    alert('agenda salva obrigado');
  }
  excluirCard(indexDia: number) {
    if (this.diasSemana[indexDia].cards.length > 1) {
      this.diasSemana[indexDia].cards.pop();
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Não foi possível excluir',
        text: 'O dia deve ter ao menos um compromisso!',
        confirmButtonColor: '#EDA900',
        confirmButtonText: 'Ok'
      });
    }
  }
}
