import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarPlanoContasComponent } from './inserir-editar-plano-contas.component';

describe('InserirEditarPlanoContasComponent', () => {
  let component: InserirEditarPlanoContasComponent;
  let fixture: ComponentFixture<InserirEditarPlanoContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirEditarPlanoContasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarPlanoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
