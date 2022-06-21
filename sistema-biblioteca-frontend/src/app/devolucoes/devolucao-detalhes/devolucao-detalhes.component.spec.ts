import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoDetalhesComponent } from './devolucao-detalhes.component';

describe('DevolucaoDetalhesComponent', () => {
  let component: DevolucaoDetalhesComponent;
  let fixture: ComponentFixture<DevolucaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucaoDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
