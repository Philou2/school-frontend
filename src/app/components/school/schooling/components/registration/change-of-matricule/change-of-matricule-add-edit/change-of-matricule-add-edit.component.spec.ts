import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOfMatriculeAddEditComponent } from './change-of-matricule-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ChangeOfMatriculeAddEditComponent;
  let fixture: ComponentFixture<ChangeOfMatriculeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeOfMatriculeAddEditComponent]
    });
    fixture = TestBed.createComponent(ChangeOfMatriculeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
