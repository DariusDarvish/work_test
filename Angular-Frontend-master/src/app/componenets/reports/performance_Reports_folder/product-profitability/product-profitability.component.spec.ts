import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfitabilityComponent } from './product-profitability.component';

describe('ProductProfitabilityComponent', () => {
  let component: ProductProfitabilityComponent;
  let fixture: ComponentFixture<ProductProfitabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductProfitabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductProfitabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
