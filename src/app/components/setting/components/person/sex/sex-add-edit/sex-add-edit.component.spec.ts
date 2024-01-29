import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexAddEditComponent } from './sex-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: SexAddEditComponent;
  let fixture: ComponentFixture<SexAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SexAddEditComponent]
    });
    fixture = TestBed.createComponent(SexAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
