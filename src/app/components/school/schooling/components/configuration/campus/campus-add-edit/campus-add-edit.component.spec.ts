import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusAddEditComponent } from './campus-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: CampusAddEditComponent;
  let fixture: ComponentFixture<CampusAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusAddEditComponent]
    });
    fixture = TestBed.createComponent(CampusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
