import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAddEditComponent } from './module-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ModuleAddEditComponent;
  let fixture: ComponentFixture<ModuleAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleAddEditComponent]
    });
    fixture = TestBed.createComponent(ModuleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
