import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDetalhesComponent } from './emprestimo-detalhes.component';

describe('EmprestimoDetalhesComponent', () => {
  let component: EmprestimoDetalhesComponent;
  let fixture: ComponentFixture<EmprestimoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmprestimoDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
