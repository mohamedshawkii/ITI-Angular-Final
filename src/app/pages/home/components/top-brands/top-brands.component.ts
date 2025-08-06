import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '@env/environments';
import { IBrand } from '@interfaces/IBrand';

@Component({
  selector: 'app-top-brands',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-brands.component.html',
  styleUrls: ['./top-brands.component.scss']
})
export class TopBrandsComponent {
  @Input() topBrands: IBrand[] = [];
  EURL = environment.apiUrl;
}

