import { TestBed } from '@angular/core/testing';

import { DevolucoesResolver } from './devolucoes.resolver';

describe('DevolucoesResolver', () => {
  let resolver: DevolucoesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DevolucoesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
