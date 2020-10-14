import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardForcastComponent } from './standard-forcast.component';

describe('StandardForcastComponent', () => {
  let component: StandardForcastComponent;
  let fixture: ComponentFixture<StandardForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardForcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
