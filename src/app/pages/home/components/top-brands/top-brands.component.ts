import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopBrand } from '../../../../interfaces/top-Brand';

@Component({
  selector: 'app-top-brands',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-brands.component.html',
  styleUrls: ['./top-brands.component.scss']
})
export class TopBrandsComponent {
  @Input() topBrands: TopBrand[] = [];
}

