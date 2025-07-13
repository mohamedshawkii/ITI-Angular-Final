import { TestBed } from '@angular/core/testing';

import { UserManagementServic } from './user-management-servic';

describe('UserManagementServic', () => {
  let service: UserManagementServic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementServic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
