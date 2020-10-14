import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhmenuComponent } from './searhmenu.component';

describe('SearhmenuComponent', () => {
  let component: SearhmenuComponent;
  let fixture: ComponentFixture<SearhmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
