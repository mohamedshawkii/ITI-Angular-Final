import { Component, Input } from '@angular/core';
import { IScheduleItem } from '../../../../interfaces/ischedule-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss'],
})
export class EventScheduleComponent {
  @Input() eventSchedule!: IScheduleItem[];
}
