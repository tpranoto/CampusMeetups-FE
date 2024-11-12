import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  // Method to get the list of trips
  getListofTrips(
    page: number,
    perPage: number,
    catId: string,
    expand: boolean
  ): Observable<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString())
      .set('expand', expand.toString());

    if (catId) {
      params = params.set('categoryId', catId);
    }

    const options = {
      params: params,
    };

    return this.httpClient.get<any[]>(this.hostUrl + 'app/trip', options);
  }

  // Method to fetch list of trips by URL
  getListOfTripsByUrl(url: string): Observable<any[]> {
    return this.httpClient.get<any[]>(url);
  }

  // Method to get trip details by tripId
  getTripDetails(tripId: string): Observable<any> {
    // Construct the API endpoint for the specific trip
    return this.httpClient.get<any>(`${this.hostUrl}app/trip/${tripId}`);
  }
}
