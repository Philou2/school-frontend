import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilityAddEditComponent } from './civility-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: CivilityAddEditComponent;
  let fixture: ComponentFixture<CivilityAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CivilityAddEditComponent]
    });
    fixture = TestBed.createComponent(CivilityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
