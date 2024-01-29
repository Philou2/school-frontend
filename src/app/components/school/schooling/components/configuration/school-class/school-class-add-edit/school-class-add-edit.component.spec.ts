import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassAddEditComponent } from './school-class-add-edit.component';

describe('TrainingTypeAddEditComponent', () => {
  let component: SchoolClassAddEditComponent;
  let fixture: ComponentFixture<SchoolClassAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolClassAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolClassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
