import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  hostUrl: string = 'http://localhost:8080/'; // Replace with your server URL

  constructor(private httpClient: HttpClient) { }

  getYourTrips() {
    return this.httpClient.get<any>(this.hostUrl + 'app/trip'); // Assuming endpoint fetches all trips
  }

  getListofTrips(
    page: number,
    perPage: number,
    catId: string,
    expand: boolean
  ) {
    const params = new HttpParams()
      .set('page', page)
      .set('perPage', perPage)
      .set('expand', expand);

    if (catId !== '') {
      params.set('categoryId', catId);
    }

    const options = {
      params: params,
    };

    return this.httpClient.get<any[]>(this.hostUrl + 'app/trip', options);
  }

  getListOfTripsByUrl(url: string) {
    return this.httpClient.get<any[]>(url);
  }

  // Fetch trips for the next 7 days
  getNext7DaysTrips() {
    return this.httpClient.get<any>(this.hostUrl + 'app/trips/next7days'); // API endpoint for next 7 days trips
  }

  getTripDetails() {
    // Method for trip details if needed in the future
  }
}
