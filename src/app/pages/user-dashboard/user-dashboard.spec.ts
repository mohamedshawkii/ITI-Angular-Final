import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboard } from './user-dashboard';

describe('AdminDashboard', () => {
  let component: UserDashboard;
  let fixture: ComponentFixture<UserDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [userDashboard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(userDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
