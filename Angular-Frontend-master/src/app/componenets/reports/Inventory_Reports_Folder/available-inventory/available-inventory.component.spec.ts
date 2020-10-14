import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableInventoryComponent } from './available-inventory.component';

describe('AvailableInventoryComponent', () => {
  let component: AvailableInventoryComponent;
  let fixture: ComponentFixture<AvailableInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
