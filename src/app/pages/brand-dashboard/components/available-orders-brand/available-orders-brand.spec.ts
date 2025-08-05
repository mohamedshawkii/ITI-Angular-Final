import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOrdersBrand } from './available-orders-brand';

describe('AvailableOrders', () => {
  let component: AvailableOrdersBrand;
  let fixture: ComponentFixture<AvailableOrdersBrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableOrdersBrand]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AvailableOrdersBrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
