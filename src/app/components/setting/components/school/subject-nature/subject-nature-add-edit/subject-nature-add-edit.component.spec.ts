import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectNatureAddEditComponent } from './subject-nature-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: SubjectNatureAddEditComponent;
  let fixture: ComponentFixture<SubjectNatureAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectNatureAddEditComponent]
    });
    fixture = TestBed.createComponent(SubjectNatureAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
