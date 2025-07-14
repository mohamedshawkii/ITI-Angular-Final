import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../../interfaces/brand';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {
  @Input() brand!: Brand;

  toggleFollow() {
    this.brand.isFollowed = !this.brand.isFollowed;
  }
}
