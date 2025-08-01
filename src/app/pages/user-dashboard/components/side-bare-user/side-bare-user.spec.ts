import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBare } from './side-bare-user';

describe('SideBare', () => {
  let component: SideBare;
  let fixture: ComponentFixture<SideBare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBare]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideBare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
