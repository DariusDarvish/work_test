import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFromEmailComponent } from './create-user-from-email.component';

describe('CreateUserFromEmailComponent', () => {
  let component: CreateUserFromEmailComponent;
  let fixture: ComponentFixture<CreateUserFromEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserFromEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserFromEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
