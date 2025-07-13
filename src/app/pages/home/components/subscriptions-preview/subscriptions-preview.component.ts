import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriptions-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions-preview.component.html',
  styleUrls: ['./subscriptions-preview.component.scss']
})
export class SubscriptionsPreviewComponent {}
