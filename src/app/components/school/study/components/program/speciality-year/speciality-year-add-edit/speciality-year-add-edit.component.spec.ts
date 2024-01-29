import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityYearAddEditComponent } from './speciality-year-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: SpecialityYearAddEditComponent;
  let fixture: ComponentFixture<SpecialityYearAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialityYearAddEditComponent]
    });
    fixture = TestBed.createComponent(SpecialityYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
