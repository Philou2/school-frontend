import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddComponent } from './menu-add.component';

describe('ParticipantAddEditComponent', () => {
  let component: MenuAddComponent;
  let fixture: ComponentFixture<MenuAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAddComponent]
    });
    fixture = TestBed.createComponent(MenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
