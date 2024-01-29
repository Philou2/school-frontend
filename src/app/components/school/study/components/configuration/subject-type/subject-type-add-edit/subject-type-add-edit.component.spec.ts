import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTypeAddEditComponent } from './subject-type-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: SubjectTypeAddEditComponent;
  let fixture: ComponentFixture<SubjectTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(SubjectTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
