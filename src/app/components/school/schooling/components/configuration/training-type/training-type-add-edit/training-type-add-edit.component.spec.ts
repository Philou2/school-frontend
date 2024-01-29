import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTypeAddEditComponent } from './training-type-add-edit.component';

describe('TrainingTypeAddEditComponent', () => {
  let component: TrainingTypeAddEditComponent;
  let fixture: ComponentFixture<TrainingTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(TrainingTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
