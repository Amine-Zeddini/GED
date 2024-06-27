import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeDocumentComponent } from './list-type-document.component';

describe('ListTypeDocumentComponent', () => {
  let component: ListTypeDocumentComponent;
  let fixture: ComponentFixture<ListTypeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
