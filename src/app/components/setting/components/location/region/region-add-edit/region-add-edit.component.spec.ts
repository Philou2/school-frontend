import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionAddEditComponent } from './region-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: RegionAddEditComponent;
  let fixture: ComponentFixture<RegionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionAddEditComponent]
    });
    fixture = TestBed.createComponent(RegionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
