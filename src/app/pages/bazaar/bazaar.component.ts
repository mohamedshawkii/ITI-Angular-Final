import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NextEventComponent } from './components/next-event/next-event.component';
import { FeaturedBrandsComponent } from './components/featured-brands/featured-brands.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { IfeaturedBrand } from '../../interfaces/ifeatured-brand';
import { IScheduleItem } from '../../interfaces/ischedule-item';
import { IBazaarActivity } from '../../interfaces/ibazaar-activity';
import { IPastEvent } from '../../interfaces/ipast-event';
import { INextEvent } from '../../interfaces/inext-event';

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
  nextEvent: INextEvent = {
    title: 'Summer Artisan Showcase',
    date: 'July 15, 2025',
    dateTime: 'Saturday, July 15, 2025 • 10:00 AM - 6:00 PM',
    location: 'Betna Community Center, Downtown',
    entry: 'Free for all our customers',
    highlights: [
      { icon: '🎨', text: 'Live pottery demonstrations' },
      { icon: '🍯', text: 'Honey tasting sessions' },
      { icon: '🧶', text: 'Knitting workshops' },
      { icon: '🎵', text: 'Local musicians performances' },
      { icon: '🍰', text: 'Artisan food sampling' },
      { icon: '🎁', text: 'Exclusive event discounts' },
    ],
  };

  featuredBrands: IfeaturedBrand[] = [
    {
      id: 1,
      name: 'Artisan Bakery',
      category: 'Food & Beverages',
      description:
        'Fresh sourdough breads and pastries made with traditional techniques.',
      icon: '🍞',
      isNew: false,
      specialOffer: '20% off all bread loaves',
      isFollowed: false,
    },
    {
      id: 2,
      name: 'Clay & Soul Pottery',
      category: 'Home Decor',
      description:
        'Handcrafted ceramic pieces inspired by nature and mindfulness.',
      icon: '🏺',
      isNew: true,
      specialOffer: 'Free pottery painting session',
      isFollowed: true,
    },
    {
      id: 3,
      name: 'Golden Hive',
      category: 'Food & Beverages',
      description:
        'Raw honey and bee products from local sustainable apiaries.',
      icon: '🍯',
      isNew: false,
      specialOffer: 'Buy 2 jars, get 1 free',
      isFollowed: false,
    },
  ];

  bazaarActivities: IBazaarActivity[] = [
    {
      icon: '🎨',
      title: 'Live Demonstrations',
      description:
        'Watch artisans create their products in real-time and learn about their techniques.',
      duration: '30-45 minutes',
      level: 'All levels',
    },
    {
      icon: '🛠️',
      title: 'Hands-on Workshops',
      description:
        'Participate in guided workshops and create your own small craft project.',
      duration: '60-90 minutes',
      level: 'Beginner friendly',
    },
    {
      icon: '🍯',
      title: 'Product Tastings',
      description:
        'Sample artisan foods, beverages, and other consumable products.',
      duration: '15-20 minutes',
      level: 'All ages',
    },
    {
      icon: '💬',
      title: 'Meet the Makers',
      description:
        'Chat directly with brand owners and learn about their journey and inspiration.',
      duration: 'Ongoing',
      level: 'All levels',
    },
    {
      icon: '🎵',
      title: 'Live Entertainment',
      description:
        'Enjoy performances by local musicians and artists throughout the event.',
      duration: '20-30 minutes',
      level: 'All ages',
    },
    {
      icon: '🎁',
      title: 'Exclusive Shopping',
      description:
        'Access special event-only products and discounts from participating brands.',
      duration: 'All day',
      level: 'All levels',
    },
  ];

  ngOnInit(): void {}

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
