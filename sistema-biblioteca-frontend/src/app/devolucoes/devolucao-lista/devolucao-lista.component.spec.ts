import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoListaComponent } from './devolucao-lista.component';

describe('DevolucaoListaComponent', () => {
  let component: DevolucaoListaComponent;
  let fixture: ComponentFixture<DevolucaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucaoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
