import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementsReportComponent } from './settlements-report.component';

describe('SettlementsReportComponent', () => {
  let component: SettlementsReportComponent;
  let fixture: ComponentFixture<SettlementsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
