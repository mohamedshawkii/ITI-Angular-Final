import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@services/auth';
import { IBazaar } from '@interfaces/IBazaar';
import { BazaarService } from '@services/bazaar-service';
import { FormGroup } from '@angular/forms';
import { BrandService } from '@services/brand.service';

@Component({
  selector: 'app-next-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.scss'],
})
export class NextEventComponent implements OnInit {
  userRole!: string | string[] | null;
  userID!: string;
  nextEvent!: IBazaar;
  BrandID!: number;
  registerForm!: FormGroup;
  IsRegisted: boolean = false;
  IsHasBrand: boolean = false;

  _BazaarService = inject(BazaarService);
  _BrandService = inject(BrandService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.userRole = this._AuthService.getRole();
    this.getLatestBazaar();
    this.GetUserId();
  }

  CheckIfRegistered(): void {
    this._BrandService.GetRegisteredBrandInBazar(this.BrandID).subscribe({
      next: (data) => {
        // console.log("Registered Brands>>:", data);
        data.forEach((bazar) => {
          // Check if the bazaar ID that Brand has matches the next event ID
          if (bazar.id === this.nextEvent.id) {
            this.IsRegisted = true;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching available brands:', error);
      }
    });
  }

  RegisterInEvent(): void {
    if (!this.IsRegisted) {
      if (this.nextEvent.id !== undefined || this.nextEvent.id !== null && this.BrandID !== null || this.BrandID !== undefined) {
        this.AddBrandToBazar(this.nextEvent.id, this.BrandID);
        this.IsRegisted = true;
      }
    } else {
      this.IsRegisted = false;
    }
  }

  GetUserId(): void {
    this.userID = this._AuthService.getCurrentUserID()!;
    this.userRole = this._AuthService.getRole()!;
    if (this.userID !== null && this.userID !== undefined && this.userRole.includes('BrandOwner')) {
      this.GetBrandId();
    }
  }

  GetBrandId() {
    this._BrandService.GetBrandByUserId(this.userID).subscribe({
      next: (data) => {
        this.BrandID = data[0].id;
        if (this.BrandID !== null && this.BrandID !== undefined) {
          this.IsHasBrand = true;
        }
        this.CheckIfRegistered();
        // console.log(data);
      },
      error: (error) => {
        // console.error('Error fetching available brands:', error);
      }
    });
  }

  AddBrandToBazar(eventId: number, brandId: number): void {
    this._BazaarService.addBrandToBazaar(eventId, brandId).subscribe({
      next: () => {
        alert('✅ Brand successfully registered for the event!');
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err);
      }
    });
  }

  getLatestBazaar(): void {
    this._BazaarService.getNextEvent().subscribe({
      next: (res) => {
        // console.log("next event", res);
        this.nextEvent = res;
        this.nextEvent.eventDate = new Date(this.nextEvent.eventDate);

      },
      error: (err) => {
        console.error('Error fetching the next event.', err);
      }
    });
  }
}
