import { Component, Input } from '@angular/core';
import { IfeaturedBrand } from '../../../../interfaces/ifeatured-brand';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-brands.component.html',
  styleUrls: ['./featured-brands.component.scss'],
})
export class FeaturedBrandsComponent {
  @Input() featuredBrands: IfeaturedBrand[] = [];

  @Input() viewBrand!: (id: number) => void;
  @Input() followBrand!: (id: number) => void;
}
