import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatingAddEditComponent } from './repeating-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: RepeatingAddEditComponent;
  let fixture: ComponentFixture<RepeatingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepeatingAddEditComponent]
    });
    fixture = TestBed.createComponent(RepeatingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
