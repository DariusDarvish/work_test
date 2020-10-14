import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreformanceComponent } from './product-preformance.component';

describe('ProductPreformanceComponent', () => {
  let component: ProductPreformanceComponent;
  let fixture: ComponentFixture<ProductPreformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPreformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
