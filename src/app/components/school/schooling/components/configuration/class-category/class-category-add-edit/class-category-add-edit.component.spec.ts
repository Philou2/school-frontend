import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCategoryAddEditComponent } from './class-category-add-edit.component';

describe('ClassCategoryAddEditComponent', () => {
  let component: ClassCategoryAddEditComponent;
  let fixture: ComponentFixture<ClassCategoryAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCategoryAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
