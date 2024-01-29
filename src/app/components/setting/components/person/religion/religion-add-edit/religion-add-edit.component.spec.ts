import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionAddEditComponent } from './religion-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ReligionAddEditComponent;
  let fixture: ComponentFixture<ReligionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReligionAddEditComponent]
    });
    fixture = TestBed.createComponent(ReligionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
