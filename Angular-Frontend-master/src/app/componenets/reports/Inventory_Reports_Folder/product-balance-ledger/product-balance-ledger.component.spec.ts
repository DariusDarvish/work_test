import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBalanceLedgerComponent } from './product-balance-ledger.component';

describe('ProductBalanceLedgerComponent', () => {
  let component: ProductBalanceLedgerComponent;
  let fixture: ComponentFixture<ProductBalanceLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBalanceLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBalanceLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
