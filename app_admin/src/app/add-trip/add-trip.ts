import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripData } from '../services/trip-data';
import type { Trip } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  private readonly tripData = inject(TripData);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly errorMessage = signal('');

  readonly trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  saveTrip(): void {
    if (this.saving()) {
      return;
    }

    this.errorMessage.set('');
    this.saving.set(true);

    this.tripData.addTrip(this.trip).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/']);
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Could not save the trip. Check the fields and try again.');
      }
    });
  }
}