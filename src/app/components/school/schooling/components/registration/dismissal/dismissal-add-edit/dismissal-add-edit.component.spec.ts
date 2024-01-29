import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissalAddEditComponent } from './dismissal-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: DismissalAddEditComponent;
  let fixture: ComponentFixture<DismissalAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DismissalAddEditComponent]
    });
    fixture = TestBed.createComponent(DismissalAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
