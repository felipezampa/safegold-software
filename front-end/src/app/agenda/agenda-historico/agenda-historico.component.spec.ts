import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaHistoricoComponent } from './agenda-historico.component';

describe('AgendaHistoricoComponent', () => {
  let component: AgendaHistoricoComponent;
  let fixture: ComponentFixture<AgendaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
