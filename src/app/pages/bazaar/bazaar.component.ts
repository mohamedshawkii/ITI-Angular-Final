import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { NextEventComponent } from './components/next-event/next-event.component';
import { FeaturedBrandsComponent } from './components/featured-brands/featured-brands.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { BrandService } from '@services/brand.service'; 
import { IBrand } from '@interfaces/IBrand'; 
import { BazaarService } from '@services/bazaar-service'; 

@Component({
  selector: 'app-bazaar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NextEventComponent,
    FeaturedBrandsComponent,
    ActivitiesComponent,
  ],
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit {
  featuredBrands: IBrand[] = [];
  _BrandService = inject(BrandService);
  _BazarService = inject(BazaarService);

  constructor() { }
  ngOnInit(): void {
    this.GetLatestEvents();
  }

  GetFeaturedBrands(BazarId: number) {
    this._BrandService.GetBrandByBazarId(BazarId).subscribe({
      next: (data) => {
        this.featuredBrands = data;
        // console.log('Featured brands:', this.featuredBrands);
      },
      error: (err) => {
        console.error('Error fetching featured brands:', err);
      },
    });
  }

  GetLatestEvents() {
    this._BazarService.getNextEvent().subscribe({
      next: (data) => {
        // console.log('Latest events:', data);
        this.GetFeaturedBrands(data.id);
      },
      error: (err) => {
        console.error('Error fetching latest events:', err);
      },
    });

  }
}