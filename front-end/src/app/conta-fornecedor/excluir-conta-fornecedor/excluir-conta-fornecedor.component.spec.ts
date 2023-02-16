import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirContaFornecedorComponent } from './excluir-conta-fornecedor.component';

describe('ExcluirContaFornecedorComponent', () => {
  let component: ExcluirContaFornecedorComponent;
  let fixture: ComponentFixture<ExcluirContaFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirContaFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirContaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
