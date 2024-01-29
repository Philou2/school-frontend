import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTeacherComponent } from './import-teacher.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportTeacherComponent;
  let fixture: ComponentFixture<ImportTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTeacherComponent]
    });
    fixture = TestBed.createComponent(ImportTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
