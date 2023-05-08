import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/auth';
import { MatrizContaFornecedorService } from '../conta-fornecedor';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-financeiro',
  templateUrl: './dashboard-financeiro.component.html',
  styleUrls: ['./dashboard-financeiro.component.css']
})
export class DashboardFinanceiroComponent implements OnInit {

  totalFornecedores = 0;
  fornecedoresComVinculo = 0;
  fornecedoresSemVinculo = 0;
  currentEmpresa!: string;
  ocorrenciasArray: { descricao: string, quantidade: number }[] = [];
  isLoading: boolean = false;
  username!: String;
  @ViewChild('barChart') barChart!: ElementRef;

  constructor(private matrizContaFornecedorService: MatrizContaFornecedorService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentEmpresa = this.authService.getCurrentNome_empresa();
    this.isLoading = true;
    this.getFornecedores();
    this.username = this.authService.getUsername();
  }

  getFornecedores(): void {
    this.matrizContaFornecedorService.listMatrizAnalitica().subscribe(fornecedores => {
      this.totalFornecedores = fornecedores.length;
      this.fornecedoresComVinculo = fornecedores.filter(fornecedor => fornecedor.vinculo === 1).length;
      this.fornecedoresSemVinculo = fornecedores.filter(fornecedor => fornecedor.vinculo === 0).length;
      const ocorrencias: { [key: string]: number } = {};

      fornecedores.forEach(fornecedor => {
        if (ocorrencias[fornecedor.desc_cod_conta_analitica]) {
          ocorrencias[fornecedor.desc_cod_conta_analitica]++;
        } else {
          ocorrencias[fornecedor.desc_cod_conta_analitica] = 1;
        }
      });
      this.ocorrenciasArray = Object.entries(ocorrencias).map(([descricao, quantidade]) => ({
        descricao: descricao === "undefined" ? "Não Vinculados" : descricao, quantidade
      }));
      this.isLoading = false;
      this.createBarChart();
    });
  }

  createBarChart(): void {
    const labels = ["Fornecedores com vínculo", "Fornecedores sem vínculo"];
    const dados = [this.fornecedoresComVinculo, this.fornecedoresSemVinculo];
    const colors = ["#006472", "#EDA900"];
    new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: dados,
          backgroundColor: colors
        }]
      },
    });
  }
}
