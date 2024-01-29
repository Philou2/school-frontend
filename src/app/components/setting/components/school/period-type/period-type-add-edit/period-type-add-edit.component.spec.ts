import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTypeAddEditComponent } from './period-type-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: PeriodTypeAddEditComponent;
  let fixture: ComponentFixture<PeriodTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(PeriodTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
