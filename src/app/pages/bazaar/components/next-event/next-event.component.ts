import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INextEvent } from '../../../../interfaces/inext-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.scss'],
})
export class NextEventComponent {
  @Input() nextEvent!: INextEvent;
  @Output() register = new EventEmitter<void>();
}
