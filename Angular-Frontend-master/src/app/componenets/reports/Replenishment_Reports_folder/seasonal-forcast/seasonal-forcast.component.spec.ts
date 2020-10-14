import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalForcastComponent } from './seasonal-forcast.component';

describe('SeasonalForcastComponent', () => {
  let component: SeasonalForcastComponent;
  let fixture: ComponentFixture<SeasonalForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonalForcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonalForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
