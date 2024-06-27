import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCpfComponent } from './add-cpf.component';

describe('AddCpfComponent', () => {
  let component: AddCpfComponent;
  let fixture: ComponentFixture<AddCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
