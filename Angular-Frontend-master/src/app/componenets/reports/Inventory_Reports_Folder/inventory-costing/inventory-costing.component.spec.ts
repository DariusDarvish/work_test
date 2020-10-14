import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCostingComponent } from './inventory-costing.component';

describe('InventoryCostingComponent', () => {
  let component: InventoryCostingComponent;
  let fixture: ComponentFixture<InventoryCostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
