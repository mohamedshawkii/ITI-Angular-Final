import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentStatus } from './user-payment-status';

describe('UserPaymentStatus', () => {
  let component: UserPaymentStatus;
  let fixture: ComponentFixture<UserPaymentStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPaymentStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPaymentStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
