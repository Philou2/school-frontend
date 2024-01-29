import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassYearAddEditComponent } from './class-year-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ClassYearAddEditComponent;
  let fixture: ComponentFixture<ClassYearAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassYearAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
