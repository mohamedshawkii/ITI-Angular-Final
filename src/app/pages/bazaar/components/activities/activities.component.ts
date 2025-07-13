import { Component, Input } from '@angular/core';
import { IBazaarActivity } from '../../../../interfaces/ibazaar-activity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  @Input() bazaarActivities!: IBazaarActivity[];
}
