import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarContaFornecedorComponent } from './inserir-editar-conta-fornecedor.component';

describe('InserirEditarContaFornecedorComponent', () => {
  let component: InserirEditarContaFornecedorComponent;
  let fixture: ComponentFixture<InserirEditarContaFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirEditarContaFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarContaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
