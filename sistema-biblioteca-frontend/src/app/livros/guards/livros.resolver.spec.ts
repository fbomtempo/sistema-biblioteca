import { TestBed } from '@angular/core/testing';

import { LivrosResolver } from './livros.resolver';

describe('LivrosResolver', () => {
  let resolver: LivrosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LivrosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
