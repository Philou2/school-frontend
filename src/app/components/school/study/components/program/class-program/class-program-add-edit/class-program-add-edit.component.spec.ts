import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassProgramAddEditComponent } from './class-program-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ClassProgramAddEditComponent;
  let fixture: ComponentFixture<ClassProgramAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassProgramAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassProgramAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
