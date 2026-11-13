import { Component, inject, signal } from '@angular/core';
import type { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripData } from '../services/trip-data';
import type { Trip } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tripData = inject(TripData);

  private tripCode = '';

  readonly trip = signal<Trip | null>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('tripCode');

    if (!code) {
      this.loading.set(false);
      this.errorMessage.set('No trip code was provided.');
      return;
    }

    this.tripCode = code;
    this.tripData.getTrip(code).subscribe({
      next: (trip) => {
        this.trip.set({ ...trip, start: trip.start.slice(0, 10) });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Could not load this trip.');
      }
    });
  }

  saveTrip(): void {
    const trip = this.trip();

    if (!trip || this.saving()) {
      return;
    }

    this.errorMessage.set('');
    this.saving.set(true);

    this.tripData.updateTrip(this.tripCode, trip).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/']);
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Could not update the trip. Check the fields and try again.');
      }
    });
  }
}