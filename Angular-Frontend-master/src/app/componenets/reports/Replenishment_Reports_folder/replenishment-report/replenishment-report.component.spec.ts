import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishmentReportComponent } from './replenishment-report.component';

describe('ReplenishmentReportComponent', () => {
  let component: ReplenishmentReportComponent;
  let fixture: ComponentFixture<ReplenishmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
