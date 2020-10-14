import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingspageComponent } from './usersettingspage.component';

describe('UsersettingspageComponent', () => {
  let component: UsersettingspageComponent;
  let fixture: ComponentFixture<UsersettingspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersettingspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersettingspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
