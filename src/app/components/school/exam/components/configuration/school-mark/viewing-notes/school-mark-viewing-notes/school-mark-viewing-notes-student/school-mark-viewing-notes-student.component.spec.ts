import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkViewingNotesStudentComponent } from './school-mark-viewing-notes-student.component';

describe('SchoolMarkViewingNotesStudentComponent', () => {
  let component: SchoolMarkViewingNotesStudentComponent;
  let fixture: ComponentFixture<SchoolMarkViewingNotesStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkViewingNotesStudentComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkViewingNotesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
