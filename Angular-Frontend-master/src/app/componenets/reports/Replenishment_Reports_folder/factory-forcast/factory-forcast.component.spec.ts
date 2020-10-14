import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryForcastComponent } from './factory-forcast.component';

describe('FactoryForcastComponent', () => {
  let component: FactoryForcastComponent;
  let fixture: ComponentFixture<FactoryForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryForcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
