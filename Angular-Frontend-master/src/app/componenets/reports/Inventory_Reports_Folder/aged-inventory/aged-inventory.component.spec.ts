import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedInventoryComponent } from './aged-inventory.component';

describe('AgedInventoryComponent', () => {
  let component: AgedInventoryComponent;
  let fixture: ComponentFixture<AgedInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
