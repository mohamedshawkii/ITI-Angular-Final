// import { Component, OnInit } from '@angular/core';
// import { iBrand } from '../../interfaces/ibrand';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
// import { BrandsGridComponent } from './components/brands-grid/brands-grid.component';
// import { LoadMoreComponent } from './components/load-more/load-more.component';
// import { BrandsEmptyStateComponent } from './components/brands-empty-state/brands-empty-state.component';

// @Component({
//   selector: 'app-brands',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterLink,
//     BrandsFilterComponent,
//     BrandsGridComponent,
//     LoadMoreComponent,
//     BrandsEmptyStateComponent
//   ],
//   templateUrl: './brands.component.html',
//   styleUrls: ['./brands.component.scss']
// })
// export class BrandsComponent implements OnInit {
//   allBrands: iBrand[] = [
//     {
//       id: 1,
//       name: 'Artisan Bakery',
//       category: 'Food & Beverages',
//       description: 'Fresh baked goods made with love and traditional recipes.',
//       icon: '🍞',
//       rating: 4.8,
//       productCount: 25,
//       location: 'Downtown',
//       isFollowed: false
//     },
//     {
//       id: 2,
//       name: 'Handmade Ceramics',
//       category: 'Home Decor',
//       description: 'Beautiful handcrafted pottery and ceramic pieces.',
//       icon: '🏺',
//       rating: 4.9,
//       productCount: 18,
//       location: 'Arts District',
//       isFollowed: true
//     },
//     {
//       id: 3,
//       name: 'Organic Preserves',
//       category: 'Food & Beverages',
//       description: 'Homemade jams and preserves using organic ingredients.',
//       icon: '🍯',
//       rating: 4.7,
//       productCount: 32,
//       location: 'Countryside',
//       isFollowed: false
//     },
//     {
//       id: 4,
//       name: 'Knitted Wonders',
//       category: 'Fashion & Accessories',
//       description: 'Cozy handknitted scarves, sweaters, and accessories.',
//       icon: '🧶',
//       rating: 4.6,
//       productCount: 41,
//       location: 'Uptown',
//       isFollowed: false
//     },
//     {
//       id: 5,
//       name: 'Wooden Crafts',
//       category: 'Home Decor',
//       description: 'Handcrafted wooden furniture and decorative items.',
//       icon: '🪵',
//       rating: 4.8,
//       productCount: 15,
//       location: 'Workshop District',
//       isFollowed: true
//     },
//     {
//       id: 6,
//       name: 'Herbal Soaps',
//       category: 'Beauty & Wellness',
//       description: 'Natural handmade soaps with organic herbs and oils.',
//       icon: '🧼',
//       rating: 4.9,
//       productCount: 28,
//       location: 'Garden Quarter',
//       isFollowed: false
//     },
//     {
//       id: 7,
//       name: 'Gourmet Spices',
//       category: 'Food & Beverages',
//       description: 'Exotic spice blends and seasonings from around the world.',
//       icon: '🌶️',
//       rating: 4.5,
//       productCount: 45,
//       location: 'Spice Market',
//       isFollowed: false
//     },
//     {
//       id: 8,
//       name: 'Leather Goods',
//       category: 'Fashion & Accessories',
//       description: 'Handcrafted leather bags, wallets, and accessories.',
//       icon: '👜',
//       rating: 4.7,
//       productCount: 22,
//       location: 'Craft Corner',
//       isFollowed: false
//     },
//     {
//       id: 9,
//       name: 'Candle Studio',
//       category: 'Home Decor',
//       description: 'Artisan candles with unique scents and designs.',
//       icon: '🕯️',
//       rating: 4.6,
//       productCount: 35,
//       location: 'Creative Hub',
//       isFollowed: true
//     }
//   ];

//   filteredBrands: iBrand[] = [];
//   hasMoreBrands = false;
//   currentFilter = '';
//   currentSort = 'name';

//   ngOnInit() {
//     this.filteredBrands = [...this.allBrands];
//   }

//   filterByCategory(category: string) {
//     this.currentFilter = category;
//     this.applyFilters();
//   }

//   sortBrands(sortBy: string) {
//     this.currentSort = sortBy;
//     this.applySorting();
//   }

//   applyFilters() {
//     if (this.currentFilter) {
//       this.filteredBrands = this.allBrands.filter(brand =>
//         brand.category === this.currentFilter
//       );
//     } else {
//       this.filteredBrands = [...this.allBrands];
//     }
//     this.applySorting();
//   }

//   applySorting() {
//     this.filteredBrands.sort((a, b) => {
//       switch (this.currentSort) {
//         case 'rating':
//           return b.rating - a.rating;
//         case 'products':
//           return b.productCount - a.productCount;
//         case 'name':
//         default:
//           return a.name.localeCompare(b.name);
//       }
//     });
//   }

//   followBrand(brandId: number) {
//     const brand = this.allBrands.find(b => b.id === brandId);
//     if (brand) {
//       brand.isFollowed = !brand.isFollowed;
//     }
//   }

//   loadMoreBrands() {
//     console.log('Loading more brands...');
//   }

//   clearFilters() {
//     this.currentFilter = '';
//     this.currentSort = 'name';
//     this.filteredBrands = [...this.allBrands];
//     this.applySorting();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { iBrand } from '../../interfaces/ibrand';
import { BrandService } from '../../../../src/app/Services/brand.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
import { BrandsGridComponent } from './components/brands-grid/brands-grid.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { BrandsEmptyStateComponent } from './components/brands-empty-state/brands-empty-state.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrandsFilterComponent,
    BrandsGridComponent,
    LoadMoreComponent,
    BrandsEmptyStateComponent
  ],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  allBrands: iBrand[] = [];
  filteredBrands: iBrand[] = [];
  hasMoreBrands = false;
  currentFilter = '';
  currentSort = 'name';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.allBrands = brands.map(b => ({
        ...b,
        icon: this.getIconForCategory(b.category),
        location: 'Online Store', // مؤقتًا
        isFollowed: false         // مؤقتًا
      }));
      this.filteredBrands = [...this.allBrands];
      this.applySorting();
    });
  }

  filterByCategory(category: string): void {
    this.currentFilter = category;
    this.applyFilters();
  }

  sortBrands(sortBy: string): void {
    this.currentSort = sortBy;
    this.applySorting();
  }

  applyFilters(): void {
    if (this.currentFilter) {
      this.filteredBrands = this.allBrands.filter(brand =>
        brand.category === this.currentFilter
      );
    } else {
      this.filteredBrands = [...this.allBrands];
    }
    this.applySorting();
  }

  applySorting(): void {
    this.filteredBrands.sort((a, b) => {
      switch (this.currentSort) {
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'products':
          return b.productCount - a.productCount;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }

  followBrand(brandId: number): void {
    const brand = this.allBrands.find(b => b.id === brandId);
    if (brand) {
      brand.isFollowed = !brand.isFollowed;
    }
  }

  loadMoreBrands(): void {
    console.log('Loading more brands...');
  }

  clearFilters(): void {
    this.currentFilter = '';
    this.currentSort = 'name';
    this.filteredBrands = [...this.allBrands];
    this.applySorting();
  }

  private getIconForCategory(category: string): string {
    switch (category) {
      case 'Food & Beverages': return '🍽️';
      case 'Fashion & Accessories': return '👜';
      case 'Home Decor': return '🏠';
      case 'Beauty & Wellness': return '💄';
      default: return '🏷️';
    }
  }
}

