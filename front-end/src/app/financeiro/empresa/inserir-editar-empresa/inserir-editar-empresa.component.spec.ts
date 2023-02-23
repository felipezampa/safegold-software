import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarEmpresaComponent } from './inserir-editar-empresa.component';

describe('InserirEditarEmpresaComponent', () => {
  let component: InserirEditarEmpresaComponent;
  let fixture: ComponentFixture<InserirEditarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirEditarEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
