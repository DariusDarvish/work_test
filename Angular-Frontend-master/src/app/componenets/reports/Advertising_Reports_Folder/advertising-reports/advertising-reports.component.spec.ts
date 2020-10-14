import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingReportsComponent } from './advertising-reports.component';

describe('AdvertisingReportsComponent', () => {
  let component: AdvertisingReportsComponent;
  let fixture: ComponentFixture<AdvertisingReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
