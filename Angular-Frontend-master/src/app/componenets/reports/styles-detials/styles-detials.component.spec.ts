import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesDetialsComponent } from './styles-detials.component';

describe('StylesDetialsComponent', () => {
  let component: StylesDetialsComponent;
  let fixture: ComponentFixture<StylesDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
