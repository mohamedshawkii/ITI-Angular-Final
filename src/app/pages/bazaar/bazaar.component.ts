import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NextEventComponent } from './components/next-event/next-event.component';
import { FeaturedBrandsComponent } from './components/featured-brands/featured-brands.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { IfeaturedBrand } from '../../interfaces/ifeatured-brand';

import { INextEvent } from '../../interfaces/inext-event';
import { BazaarService } from '../../Services/bazaar-service';

@Component({
  selector: 'app-bazaar',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    NextEventComponent,
    FeaturedBrandsComponent,
    ActivitiesComponent,
  ],
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit {
  nextEvent!: INextEvent;
  featuredBrands: IfeaturedBrand[] = [];

  constructor(private bazaarService: BazaarService) { }

  ngOnInit(): void {
    const bazaarId = 1;
    // this.bazaarService.getNextEvent(bazaarId).subscribe((data) => {
    //   this.nextEvent = data;

    this.bazaarService.getNextEvent(bazaarId).subscribe(
      {
        next: (data) => {
          console.log('Next event data:', data);
          this.nextEvent = data;
        },
        error: (error) => {
          console.error('Error fetching next event:', error);
        },
      }
    );

    // });

    this.bazaarService.getBrandsForBazaar(bazaarId).subscribe((data) => {
      this.featuredBrands = data.map((brand) => ({
        ...brand,
        icon: '✨',
        isNew: false,
        isFollowed: false,
        specialOffer: '',
      }));
    });
  }

  registerForEvent(): void {
    alert(
      'Registration for the Summer Artisan Showcase is now open! You will receive a confirmation email shortly.'
    );
  }

  viewBrand(brandId: number) {
    console.log('Viewing brand:', brandId);
    alert(`Redirecting to brand page for brand ID: ${brandId}`);
  }

  followBrand(brandId: number) {
    alert(`Toggling follow for brand ID: ${brandId}`);
  }
}
