import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationAddEditComponent } from './resignation-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: ResignationAddEditComponent;
  let fixture: ComponentFixture<ResignationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResignationAddEditComponent]
    });
    fixture = TestBed.createComponent(ResignationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
