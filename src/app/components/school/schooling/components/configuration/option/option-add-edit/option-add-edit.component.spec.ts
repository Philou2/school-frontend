import { ComponentFixture, TestBed } from '@angular/core/testing';

import {OptionAddEditComponent } from './option-add-edit.component';

describe('OptionAddEditComponent', () => {
  let component: OptionAddEditComponent;
  let fixture: ComponentFixture<OptionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionAddEditComponent]
    });
    fixture = TestBed.createComponent(OptionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
