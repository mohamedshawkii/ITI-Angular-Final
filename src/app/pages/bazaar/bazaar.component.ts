import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NextEventComponent } from './components/next-event/next-event.component';
import { FeaturedBrandsComponent } from './components/featured-brands/featured-brands.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { IfeaturedBrand } from '../../interfaces/ifeatured-brand';
import { BazaarService } from '../../Services/bazaar-service';
import { Auth } from '../../Services/auth';
import { IBazaar } from '../../interfaces/ibazaar';

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
    ReactiveFormsModule,
  ],
  templateUrl: './bazaar.component.html',
  styleUrls: ['./bazaar.component.scss'],
})
export class BazaarComponent implements OnInit {
  nextEvent!: IBazaar;
  featuredBrands: IfeaturedBrand[] = [];
  brandId!: number;

  constructor(private bazaarService: BazaarService, public authService: Auth) {}

  ngOnInit(): void {
    this.getLatestBazaar();
    this.nextEvent.eventDate = new Date(this.nextEvent.eventDate);
  }

  AddBrandToBazar(): void {
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
          alert(err);
        },
      });
  }

  getLatestBazaar(): void {
    this.bazaarService.getNextEvent().subscribe({
      next: (res) => {
        console.log('next event', res);
        this.nextEvent = res;
      },
      error: (err) => {
        console.error('Error fetching the next event.', err);
      },
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
