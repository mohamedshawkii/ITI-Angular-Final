import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { iBrand } from '../../../../interfaces/ibrand';

@Component({
  selector: 'app-brands-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands-grid.component.html',
  styleUrls: ['./brands-grid.component.scss']
})
export class BrandsGridComponent {
  @Input() brands: iBrand[] = [];
  @Output() follow = new EventEmitter<number>();

  toggleFollow(id: number) {
    this.follow.emit(id);
  }
}
