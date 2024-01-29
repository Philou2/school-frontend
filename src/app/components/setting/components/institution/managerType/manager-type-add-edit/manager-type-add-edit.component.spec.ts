import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTypeAddEditComponent } from './manager-type-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ManagerTypeAddEditComponent;
  let fixture: ComponentFixture<ManagerTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(ManagerTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
