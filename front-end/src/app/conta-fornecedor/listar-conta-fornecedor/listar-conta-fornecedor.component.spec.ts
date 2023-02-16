import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContaFornecedorComponent } from './listar-conta-fornecedor.component';

describe('ListarContaFornecedorComponent', () => {
  let component: ListarContaFornecedorComponent;
  let fixture: ComponentFixture<ListarContaFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarContaFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarContaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
