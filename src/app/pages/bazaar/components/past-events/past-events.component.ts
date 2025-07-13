import { Component, Input } from '@angular/core';
import { IPastEvent } from '../../../../interfaces/ipast-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-past-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss'],
})
export class PastEventsComponent {
  @Input() pastEvents!: IPastEvent[];

  ngOnInit() {
    console.log('pastEvents received:', this.pastEvents);
  }
}
