import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WariningpageComponent } from './wariningpage.component';

describe('WariningpageComponent', () => {
  let component: WariningpageComponent;
  let fixture: ComponentFixture<WariningpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WariningpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WariningpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
