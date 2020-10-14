import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreatedUserToCompanyComponent } from './add-created-user-to-company.component';

describe('AddCreatedUserToCompanyComponent', () => {
  let component: AddCreatedUserToCompanyComponent;
  let fixture: ComponentFixture<AddCreatedUserToCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreatedUserToCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreatedUserToCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
