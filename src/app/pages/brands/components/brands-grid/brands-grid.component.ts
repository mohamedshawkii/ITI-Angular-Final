import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { iBrand } from '../../../../interfaces/ibrand';
import { BrandCardComponent } from '../brand-card/brand-card.component';

@Component({
  selector: 'app-brands-grid',
  standalone: true,
  imports: [CommonModule, RouterLink, BrandCardComponent],
  templateUrl: './brands-grid.component.html',
  styleUrls: ['./brands-grid.component.scss'],
})
export class BrandsGridComponent {
  @Input() brands: iBrand[] = [];
  //nahed
  @Input() currentUserId!: string;

  @Output() follow = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  toggleFollow(id: number) {
    this.follow.emit(id);
  }
  onEdit(id: number) {
    this.edit.emit(id);
  }
}
