import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGrupoContaComponent } from './sub-grupo-conta.component';

describe('SubGrupoContaComponent', () => {
  let component: SubGrupoContaComponent;
  let fixture: ComponentFixture<SubGrupoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGrupoContaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGrupoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
