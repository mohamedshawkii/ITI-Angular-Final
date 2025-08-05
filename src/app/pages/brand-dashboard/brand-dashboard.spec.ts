import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDashboardComponent } from './brand-dashboard'; 

describe('AdminDashboard', () => {
  let component: BrandDashboardComponent;
  let fixture: ComponentFixture<BrandDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDashboardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BrandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
