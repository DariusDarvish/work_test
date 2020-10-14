import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsheaderComponent } from './settingsheader.component';

describe('SettingsheaderComponent', () => {
  let component: SettingsheaderComponent;
  let fixture: ComponentFixture<SettingsheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
