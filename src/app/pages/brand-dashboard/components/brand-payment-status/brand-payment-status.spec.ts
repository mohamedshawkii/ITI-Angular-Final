import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPaymentStatus } from './brand-payment-status';

describe('BrandPaymentStatus', () => {
  let component: BrandPaymentStatus;
  let fixture: ComponentFixture<BrandPaymentStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandPaymentStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandPaymentStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
