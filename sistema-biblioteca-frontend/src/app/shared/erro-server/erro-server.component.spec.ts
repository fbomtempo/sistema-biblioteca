import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroServerComponent } from './erro-server.component';

describe('ErroServerComponent', () => {
  let component: ErroServerComponent;
  let fixture: ComponentFixture<ErroServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
