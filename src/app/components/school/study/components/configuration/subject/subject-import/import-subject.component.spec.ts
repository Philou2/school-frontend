import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSubjectComponent } from './import-subject.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportSubjectComponent;
  let fixture: ComponentFixture<ImportSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportSubjectComponent]
    });
    fixture = TestBed.createComponent(ImportSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
