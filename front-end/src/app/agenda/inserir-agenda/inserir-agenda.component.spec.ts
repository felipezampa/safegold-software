import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAgendaComponent } from './inserir-agenda.component';

describe('InserirAgendaComponent', () => {
  let component: InserirAgendaComponent;
  let fixture: ComponentFixture<InserirAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
