import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoContaComponent } from './grupo-conta.component';

describe('GrupoContaComponent', () => {
  let component: GrupoContaComponent;
  let fixture: ComponentFixture<GrupoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoContaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
