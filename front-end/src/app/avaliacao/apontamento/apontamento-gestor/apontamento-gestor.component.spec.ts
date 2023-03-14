import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApontamentoGestorComponent } from './apontamento-gestor.component';

describe('ApontamentoGestorComponent', () => {
  let component: ApontamentoGestorComponent;
  let fixture: ComponentFixture<ApontamentoGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApontamentoGestorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApontamentoGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
