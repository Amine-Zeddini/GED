import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCpfComponent } from './list-cpf.component';

describe('ListCpfComponent', () => {
  let component: ListCpfComponent;
  let fixture: ComponentFixture<ListCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
