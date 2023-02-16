import { TestBed } from '@angular/core/testing';

import { MatrizContaFornecedorService } from './matriz-conta-fornecedor.service';

describe('MatrizContaFornecedorService', () => {
  let service: MatrizContaFornecedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrizContaFornecedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
