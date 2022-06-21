import { TestBed } from '@angular/core/testing';

import { EmprestimosResolver } from './emprestimos.resolver';

describe('EmprestimosResolver', () => {
  let resolver: EmprestimosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmprestimosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
