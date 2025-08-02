import { Component, OnInit, inject } from '@angular/core';
import { iBrand } from '../../interfaces/iBrand';
import { BrandService } from '../../../../src/app/Services/brand.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BrandsFilterComponent } from './components/brands-filter/brands-filter.component';
import { BrandsGridComponent } from './components/brands-grid/brands-grid.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { BrandsEmptyStateComponent } from './components/brands-empty-state/brands-empty-state.component';
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrandsFilterComponent,
    BrandsGridComponent,
    LoadMoreComponent,
    BrandsEmptyStateComponent,
  ],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  allBrands: iBrand[] = [];
  filteredBrands: iBrand[] = [];
  hasMoreBrands = false;
  currentFilter = '';
  currentSort = 'name';
  showAddBrandButton: boolean = false;
  userRole!: string[];
  _AuthService = inject(Auth);
  currentUserId: string | null = null;

  constructor(
    private brandService: BrandService,
    private router: Router,
    public authService: Auth
  ) { }

  goToAddBrandPage(): void {
    this.router.navigate(['/brands/add']);
  }


  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.allBrands = brands.map((b) => ({
        ...b,
        icon: this.getIconForCategory(b.categoryID),
        location: 'Online Store',
        isFollowed: false,
      }));
      this.filteredBrands = [...this.allBrands];
      this.applySorting();
    });
    const role = this.authService.getRole();
    this.userRole = role;

    if (role.includes('BrandOwner')) {
      this.authService.hasBrand().subscribe({
        next: (hasBrand) => {
          this.showAddBrandButton = !hasBrand;
        },
        error: () => {
          this.showAddBrandButton = false;
        },
      });
    }
  }

  DisplayBasedOnRole(Role: string[]): boolean {
    const userRole = this._AuthService.getRole();
    return Role.some(role => userRole.includes(role));
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
      this.filteredBrands = this.allBrands.filter(
        (brand) => brand.categoryID === this.currentFilter
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
          return b.averageRating! - a.averageRating!;
        case 'products':
          return b.productCount! - a.productCount!;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }

  followBrand(brandId: number): void {
    const brand = this.allBrands.find((b) => b.id === brandId);
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
      case 'Food & Beverages':
        return '🍽️';
      case 'Fashion & Accessories':
        return '👜';
      case 'Home Decor':
        return '🏠';
      case 'Beauty & Wellness':
        return '💄';
      default:
        return '🏷️';
    }
  }
}
