import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../Services/auth';
import { IBazaar } from '../../../../interfaces/ibazaar';

@Component({
  selector: 'app-next-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.scss'],
})
export class NextEventComponent implements OnInit {

  constructor(public authService: Auth) { }

  userRole: string | string[] | null = null;

  @Input() nextEvent!: IBazaar;
  @Output() register = new EventEmitter<void>();

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  }
}
