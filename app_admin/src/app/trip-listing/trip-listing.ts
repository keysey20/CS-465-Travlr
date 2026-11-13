import { RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';
import type { Trip } from '../services/trip-data';


@Component({
  selector: 'app-trip-listing',
  imports: [TripCard, RouterLink],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  private readonly tripData = inject(TripData);

  readonly trips = signal<Trip[]>([]);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (trips: Trip[]) => this.trips.set(trips),
      error: () => this.errorMessage.set('Could not load trips. Please try again.')
    });
  }
}