import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  hostUrl: string = 'http://localhost:8080/'; // Your server URL

  constructor(private httpClient: HttpClient) { }

  // Fetch trips for a specific student by studentId
  getYourTripsForStudent(studentId: string) {
    // Updated URL format with studentId correctly placed in the path
    return this.httpClient.get<any>(`${this.hostUrl}app/attendee/${studentId}`);
  }

  // Fetch trips for the next 7 days (no studentId required)
  getNext7DaysTrips() {
    return this.httpClient.get<any>(`${this.hostUrl}app/trips/next7days`);
  }
}
