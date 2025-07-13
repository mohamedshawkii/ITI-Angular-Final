import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetail } from './brand-detail';

describe('BrandDetail', () => {
  let component: BrandDetail;
  let fixture: ComponentFixture<BrandDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
