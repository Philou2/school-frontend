import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassHourlyRateEditComponent } from './class-hourly-rate-edit.component';

describe('ClassRoomEditComponent', () => {
  let component: ClassHourlyRateEditComponent;
  let fixture: ComponentFixture<ClassHourlyRateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassHourlyRateEditComponent]
    });
    fixture = TestBed.createComponent(ClassHourlyRateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
