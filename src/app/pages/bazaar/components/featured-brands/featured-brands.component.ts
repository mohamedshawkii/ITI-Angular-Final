import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBrand } from '@interfaces/IBrand';
import { Router } from '@angular/router';
import { environment } from '@env/environments';

@Component({
  selector: 'app-featured-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-brands.component.html',
  styleUrls: ['./featured-brands.component.scss'],
})
export class FeaturedBrandsComponent {
  @Input() featuredBrands: IBrand[] = [];
  EURL = environment.apiUrl;
  constructor(private router: Router) { }

  viewBrand(id: number): void {
    this.router.navigate(['/brand', id]);
  };

  @Input() followBrand!: (id: number) => void;
}
