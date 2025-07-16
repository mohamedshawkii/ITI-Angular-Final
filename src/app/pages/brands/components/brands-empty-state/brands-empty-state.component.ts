import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-empty-state.component.html',
  styleUrls: ['./brands-empty-state.component.scss']
})
export class BrandsEmptyStateComponent {
  @Output() clear = new EventEmitter<void>();

  onClear() {
    this.clear.emit();
  }
}
