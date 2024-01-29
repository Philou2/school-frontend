import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAddEditComponent } from './country-add-edit.component';

describe('CampusAddEditComponent', () => {
  let component: CountryAddEditComponent;
  let fixture: ComponentFixture<CountryAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryAddEditComponent]
    });
    fixture = TestBed.createComponent(CountryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
