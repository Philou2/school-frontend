import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearAddEditComponent } from './school-year-add-edit.component';

describe('SchoolYearAddEditComponent', () => {
  let component: SchoolYearAddEditComponent;
  let fixture: ComponentFixture<SchoolYearAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolYearAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
