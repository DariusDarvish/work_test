import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDateReportComponent } from './dashboard-date-report.component';

describe('DashboardDateReportComponent', () => {
  let component: DashboardDateReportComponent;
  let fixture: ComponentFixture<DashboardDateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
