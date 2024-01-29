import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionSchemeAddEditComponent } from './pension-scheme-add-edit.component';

describe('ClassCategoryAddEditComponent', () => {
  let component: PensionSchemeAddEditComponent;
  let fixture: ComponentFixture<PensionSchemeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PensionSchemeAddEditComponent]
    });
    fixture = TestBed.createComponent(PensionSchemeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
