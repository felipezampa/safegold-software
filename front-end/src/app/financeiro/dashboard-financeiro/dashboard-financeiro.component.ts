import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { MatrizContaFornecedorService } from '../conta-fornecedor';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-financeiro',
  templateUrl: './dashboard-financeiro.component.html',
  styleUrls: ['./dashboard-financeiro.component.css']
})
export class DashboardFinanceiroComponent implements OnInit, AfterViewInit {

  totalFornecedores = 0;
  fornecedoresComVinculo = 0;
  fornecedoresSemVinculo = 0;
  currentEmpresa: string;
  ocorrenciasArray: { descricao: string, quantidade: number }[] = [];
  @ViewChild('barChart') barChart: ElementRef;

  constructor(private matrizContaFornecedorService: MatrizContaFornecedorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentEmpresa = this.authService.getCurrentNome_empresa();
  }

  ngAfterViewInit(): void {
    this.getFornecedores();
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
        descricao: descricao === "undefined" ? "Não Vinculados" : descricao,quantidade
      }));

      this.createBarChart();
    });
  }

  createBarChart(): void {
    const labels = this.ocorrenciasArray.map(ocorrencia => ocorrencia.descricao);
    const dados = this.ocorrenciasArray.map(ocorrencia => ocorrencia.quantidade);
    const colors = this.ocorrenciasArray.map(() => this.getRandomColor());
    const fornecedoresData = this.ocorrenciasArray.map(() => this.totalFornecedores);



    new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: dados,
          backgroundColor: colors
        },
        {
        data: fornecedoresData,
        backgroundColor: '#ccc',
        label: 'Total de Fornecedores'

      }]
      },
    });
  }



  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
