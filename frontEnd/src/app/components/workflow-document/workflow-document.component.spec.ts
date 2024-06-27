import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDocumentComponent } from './workflow-document.component';

describe('WorkflowDocumentComponent', () => {
  let component: WorkflowDocumentComponent;
  let fixture: ComponentFixture<WorkflowDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
