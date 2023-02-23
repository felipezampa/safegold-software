import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProjetoComponent } from './listar-projeto.component';

describe('ListarProjetoComponent', () => {
  let component: ListarProjetoComponent;
  let fixture: ComponentFixture<ListarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProjetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
