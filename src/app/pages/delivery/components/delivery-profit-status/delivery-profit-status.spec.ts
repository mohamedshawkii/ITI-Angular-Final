import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProfitStatus } from './delivery-profit-status';

describe('DeliveryProfitStatus', () => {
  let component: DeliveryProfitStatus;
  let fixture: ComponentFixture<DeliveryProfitStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryProfitStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryProfitStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
