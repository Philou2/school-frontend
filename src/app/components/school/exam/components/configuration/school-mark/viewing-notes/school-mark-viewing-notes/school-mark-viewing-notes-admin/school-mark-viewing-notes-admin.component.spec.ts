import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarkViewingNotesAdminComponent } from './school-mark-viewing-notes-admin.component';

describe('SchoolMarkViewingNotesAdminComponent', () => {
  let component: SchoolMarkViewingNotesAdminComponent;
  let fixture: ComponentFixture<SchoolMarkViewingNotesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolMarkViewingNotesAdminComponent]
    });
    fixture = TestBed.createComponent(SchoolMarkViewingNotesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
