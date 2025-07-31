import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryHistory } from './delivery-history-user';

describe('DeliveryHistory', () => {
  let component: DeliveryHistory;
  let fixture: ComponentFixture<DeliveryHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
