import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { iBrand } from '../../../../interfaces/iBrand';

@Component({
  selector: 'app-brands-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands-grid.component.html',
  styleUrls: ['./brands-grid.component.scss'],
})
export class BrandsGridComponent {
  @Input() brands: iBrand[] = [];
  //nahed
  @Input() currentUserId!: number;
  @Output() follow = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  toggleFollow(id: number) {
    this.follow.emit(id);
  }
}
