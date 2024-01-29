import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityAddEditComponent } from './speciality-add-edit.component';

describe('SpecialityAddEditComponent', () => {
  let component: SpecialityAddEditComponent;
  let fixture: ComponentFixture<SpecialityAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialityAddEditComponent]
    });
    fixture = TestBed.createComponent(SpecialityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
