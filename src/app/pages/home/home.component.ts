import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TopBrandsComponent } from './components/top-brands/top-brands.component';
import { SubscriptionsPreviewComponent } from './components/subscriptions-preview/subscriptions-preview.component';
import { BazaarSectionComponent } from './components/bazaar-section/bazaar-section.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { HomeService } from '@services/home.service';
import { IBrand } from '@interfaces/IBrand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  standalone: true,
  imports: [
    HeroSectionComponent,
    TopBrandsComponent,
    SubscriptionsPreviewComponent,
    BazaarSectionComponent,
    CallToActionComponent
  ]
})

export class HomeComponent implements OnInit {
  topBrands: IBrand[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getTopBrands().subscribe({
      next: (data) => {
        this.topBrands = data;
        // console.log('Top Brands loaded:', this.topBrands);
      },
      error: (err) => console.error('Failed to load top brands:', err)
    });
  }
}