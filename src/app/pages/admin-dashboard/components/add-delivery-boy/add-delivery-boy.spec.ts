import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryBoyComponent } from './add-delivery-boy';

describe('AddDeliveryBoy', () => {
  let component: AddDeliveryBoyComponent;
  let fixture: ComponentFixture<AddDeliveryBoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeliveryBoyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
