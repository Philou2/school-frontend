import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmissionAddEditComponent } from './readmission-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ReadmissionAddEditComponent;
  let fixture: ComponentFixture<ReadmissionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadmissionAddEditComponent]
    });
    fixture = TestBed.createComponent(ReadmissionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
