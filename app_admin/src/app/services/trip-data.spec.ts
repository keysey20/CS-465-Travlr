import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trip {
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: string;
  image: string;
  description: string;
  details?: string;
}

@Injectable({ providedIn: 'root' })
export class TripData {
  private readonly http = inject(HttpClient);
  private readonly tripsUrl = '/api/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }
    getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`/api/trips/${encodeURIComponent(code)}`);
  }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`/api/trips/${encodeURIComponent(code)}`, trip);
  }
}