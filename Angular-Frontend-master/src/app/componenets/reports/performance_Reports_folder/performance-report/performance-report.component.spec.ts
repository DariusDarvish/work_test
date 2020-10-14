import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreformanceReportComponent } from './preformance-report.component';

describe('PreformanceReportComponent', () => {
  let component: PreformanceReportComponent;
  let fixture: ComponentFixture<PreformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
