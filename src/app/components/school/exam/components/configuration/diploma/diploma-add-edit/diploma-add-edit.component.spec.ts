import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaAddEditComponent } from './diploma-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: DiplomaAddEditComponent;
  let fixture: ComponentFixture<DiplomaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomaAddEditComponent]
    });
    fixture = TestBed.createComponent(DiplomaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
