import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryAddEditComponent } from './ministry-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: MinistryAddEditComponent;
  let fixture: ComponentFixture<MinistryAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinistryAddEditComponent]
    });
    fixture = TestBed.createComponent(MinistryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
