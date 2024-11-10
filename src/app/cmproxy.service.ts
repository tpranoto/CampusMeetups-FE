import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  getListofTrips() {
    return this.httpClient.get<any[]>(this.hostUrl + 'app/trip');
  }
  getTripDetails() {}
}
