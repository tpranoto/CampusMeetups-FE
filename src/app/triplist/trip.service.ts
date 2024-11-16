import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8080/api/trips';  // Adjust API URL if needed

  constructor(private http: HttpClient) {}

  // Method to search trips by name
  searchTripsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?name=${name}`);
  }
}
