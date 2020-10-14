import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenav4settingsComponent } from './sidenav4settings.component';

describe('Sidenav4settingsComponent', () => {
  let component: Sidenav4settingsComponent;
  let fixture: ComponentFixture<Sidenav4settingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sidenav4settingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sidenav4settingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
