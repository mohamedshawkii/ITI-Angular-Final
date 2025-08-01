import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iBrand } from '../../../../interfaces/iBrand';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss'],
})
export class BrandCardComponent {
  @Input() brand!: iBrand;
  @Input() currentUserId!: string | null;

  @Output() follow = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  toggleFollow() {
    this.brand.isFollowed = !this.brand.isFollowed;
  }
}
