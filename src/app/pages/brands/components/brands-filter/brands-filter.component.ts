import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-filter.component.html',
  styleUrls: ['./brands-filter.component.scss']
})
export class BrandsFilterComponent {
  @Output() categoryChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(value);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChange.emit(value);
  }
}
