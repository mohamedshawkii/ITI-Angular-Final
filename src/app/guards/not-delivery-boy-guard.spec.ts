import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notDeliveryBoyGuard } from './not-delivery-boy-guard';

describe('notDeliveryBoyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notDeliveryBoyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
