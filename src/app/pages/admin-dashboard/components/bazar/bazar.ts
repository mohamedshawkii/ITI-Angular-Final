import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BazarService } from '../../../../Services/bazar.service';

@Component({
  selector: 'app-bazar',
  imports: [ReactiveFormsModule],
  templateUrl: './bazar.html',
  styleUrl: './bazar.scss',
})
export class Bazar implements OnInit {
  bazarForm!: FormGroup;

  _bazarService = inject(BazarService);
isSubmitting: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bazarForm = this.fb.group({
      title: ['', Validators.required],
      eventDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      entry: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bazarForm.valid) {
      const raw = this.bazarForm.value;

      // Ensure correct formatting
      const formattedStartTime = raw.startTime.length === 5 ? `${raw.startTime}:00` : raw.startTime;
      const formattedEndTime = raw.endTime.length === 5 ? `${raw.endTime}:00` : raw.endTime;

      const payload = {
        title: raw.title,
        eventDate: new Date(raw.eventDate), // or toISOString() if backend accepts it
        startTime: formattedStartTime, // "10:00:00"
        endTime: formattedEndTime,
        location: raw.location,
        entry: raw.entry
      };

      console.log('Sending to backend:', payload);

      this._bazarService.postBazar(payload).subscribe({
        next: (res) => {
          console.log('Created:', res);
          this.bazarForm.reset();
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      this.bazarForm.markAllAsTouched();
    }
  }

}
