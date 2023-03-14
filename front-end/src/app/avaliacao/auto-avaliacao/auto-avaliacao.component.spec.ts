import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAvaliacaoComponent } from './auto-avaliacao.component';

describe('AutoAvaliacaoComponent', () => {
  let component: AutoAvaliacaoComponent;
  let fixture: ComponentFixture<AutoAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoAvaliacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
