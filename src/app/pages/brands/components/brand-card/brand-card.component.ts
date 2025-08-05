import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBrand } from '../../../../interfaces/IBrand';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss'],
})
export class BrandCardComponent {
  EURL = environment.apiUrl;
  @Input() brand!: IBrand;
  @Input() currentUserId!: string | null;

  @Output() follow = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  constructor() { }


  toggleFollow() {
    this.brand.isFollowed = !this.brand.isFollowed;
  }
}
