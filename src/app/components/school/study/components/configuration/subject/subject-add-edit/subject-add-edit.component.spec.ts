import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAddEditComponent } from './subject-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: SubjectAddEditComponent;
  let fixture: ComponentFixture<SubjectAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectAddEditComponent]
    });
    fixture = TestBed.createComponent(SubjectAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
