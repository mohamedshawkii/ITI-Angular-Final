import { TestBed } from '@angular/core/testing';

import { Bazar } from '../Services/bazar.service';

describe('Bazar', () => {
  let service: Bazar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bazar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
