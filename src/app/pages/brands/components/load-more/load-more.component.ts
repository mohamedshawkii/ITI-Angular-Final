import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-more',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent {
  @Output() loadMore = new EventEmitter<void>();

  onClick() {
    this.loadMore.emit();
  }
}
