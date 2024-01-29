import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAddEditComponent } from './image-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: ImageAddEditComponent;
  let fixture: ComponentFixture<ImageAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageAddEditComponent]
    });
    fixture = TestBed.createComponent(ImageAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
