import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

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

    if (catId != '') {
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

  getTripDetails() {}
  
  // Fetch all categoriess
  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'app/category');
  }

  getTripsByCategory(categoryId: string) {
    return this.httpClient.get<any[]>(`app/trips?categoryId=${categoryId}`);
  }

}
