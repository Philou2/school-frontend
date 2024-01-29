import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOfOriginAddEditComponent } from './school-of-origin-add-edit.component';

describe('SchoolAddEditComponent', () => {
  let component: SchoolOfOriginAddEditComponent;
  let fixture: ComponentFixture<SchoolOfOriginAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolOfOriginAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolOfOriginAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
