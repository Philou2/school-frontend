import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhesusAddEditComponent } from './rhesus-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: RhesusAddEditComponent;
  let fixture: ComponentFixture<RhesusAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RhesusAddEditComponent]
    });
    fixture = TestBed.createComponent(RhesusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
