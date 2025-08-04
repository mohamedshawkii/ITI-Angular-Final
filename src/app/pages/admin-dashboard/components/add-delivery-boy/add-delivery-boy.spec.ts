import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryBoy } from './add-delivery-boy';

describe('AddDeliveryBoy', () => {
  let component: AddDeliveryBoy;
  let fixture: ComponentFixture<AddDeliveryBoy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeliveryBoy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeliveryBoy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
