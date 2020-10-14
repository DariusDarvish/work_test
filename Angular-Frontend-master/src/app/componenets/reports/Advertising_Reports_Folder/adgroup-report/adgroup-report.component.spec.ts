import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdgroupReportComponent } from './adgroup-report.component';

describe('AdgroupReportComponent', () => {
  let component: AdgroupReportComponent;
  let fixture: ComponentFixture<AdgroupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdgroupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdgroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
