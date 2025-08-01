import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDashboard } from './brand-dashboard';

describe('AdminDashboard', () => {
  let component: BrandDashboard;
  let fixture: ComponentFixture<BrandDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDashboard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BrandDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
