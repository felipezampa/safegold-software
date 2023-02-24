import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirEmpresaComponent } from './excluir-empresa.component';

describe('ExcluirEmpresaComponent', () => {
  let component: ExcluirEmpresaComponent;
  let fixture: ComponentFixture<ExcluirEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
