import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCategoryAddEditComponent } from './module-category-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ModuleCategoryAddEditComponent;
  let fixture: ComponentFixture<ModuleCategoryAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleCategoryAddEditComponent]
    });
    fixture = TestBed.createComponent(ModuleCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
