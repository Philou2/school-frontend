import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDepartmentComponent } from './import-department.component';

describe('ParticipantAddEditComponent', () => {
  let component: ImportDepartmentComponent;
  let fixture: ComponentFixture<ImportDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportDepartmentComponent]
    });
    fixture = TestBed.createComponent(ImportDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
