import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaTypeAddEditComponent } from './diploma-type-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: DiplomaTypeAddEditComponent;
  let fixture: ComponentFixture<DiplomaTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomaTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(DiplomaTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
