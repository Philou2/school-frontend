import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleAddEditComponent } from './cycle-add-edit.component';

describe('CycleAddEditComponent', () => {
  let component: CycleAddEditComponent;
  let fixture: ComponentFixture<CycleAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CycleAddEditComponent]
    });
    fixture = TestBed.createComponent(CycleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
