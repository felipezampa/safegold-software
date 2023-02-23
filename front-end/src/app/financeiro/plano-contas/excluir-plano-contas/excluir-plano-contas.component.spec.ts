import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirPlanoContasComponent } from './excluir-plano-contas.component';

describe('ExcluirPlanoContasComponent', () => {
  let component: ExcluirPlanoContasComponent;
  let fixture: ComponentFixture<ExcluirPlanoContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirPlanoContasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirPlanoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
