import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordresetpageComponent } from './passwordresetpage.component';

describe('PasswordresetpageComponent', () => {
  let component: PasswordresetpageComponent;
  let fixture: ComponentFixture<PasswordresetpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordresetpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordresetpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
