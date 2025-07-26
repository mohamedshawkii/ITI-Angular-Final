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
import { Auth } from '../../Services/auth';

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
  brandId!: number;

  constructor(
    private bazaarService: BazaarService,
    private authService: Auth
  ) {}

  //modified nahed

  ngOnInit(): void {
    const bazaarId = 1;

    const idFromToken = this.authService.getBrandIdFromToken();
    if (idFromToken) {
      this.brandId = idFromToken;
    } else {
      console.warn(' No brand ID found in token');
      this.authService.logOut();
      return;
    }

    this.bazaarService.getNextEvent(bazaarId).subscribe({
      next: (data) => {
        this.nextEvent = data;
      },
      error: (error) => {
        console.error('Error fetching next event:', error);
      },
    });

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
    if (!this.nextEvent || !this.nextEvent.id) {
      alert('Event is currently unavailable.');
      return;
    }

    this.bazaarService
      .addBrandToBazaar(this.nextEvent.id, this.brandId)
      .subscribe({
        next: () => {
          alert('✅ Brand successfully registered for the event!');
          this.bazaarService
            .getBrandsForBazaar(this.nextEvent.id)
            .subscribe((data) => {
              this.featuredBrands = data.map((brand) => ({
                ...brand,
                icon: '✨',
                isNew: false,
                isFollowed: false,
                specialOffer: '',
              }));
            });
        },
        error: (err) => {
          console.error('Error:', err);
          alert(
            err?.error?.message || ' An error occurred during registration.'
          );
        },
      });
  }
}
