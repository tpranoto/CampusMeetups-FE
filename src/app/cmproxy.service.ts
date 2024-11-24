import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  private hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  getAttendedTripsForStudent(
    studentId: string,
    limit: string
  ): Observable<any> {
    var params = new HttpParams();

    if (limit != '') {
      params = params.set('limit', limit);
    }

    const options = {
      params: params,
    };

    return this.httpClient.get<any>(
      this.hostUrl + `app/attendee/${studentId}`,
      options
    );
  }

  getLimitedUpcomingActiveTrips(
    numDays: string,
    limit: string,
    expand: boolean
  ): Observable<any> {
    var params = new HttpParams().set('days', numDays).set('expand', expand);
    if (limit != '') {
      params = params.set('perPage', limit);
    }

    const options = {
      params: params,
    };

    return this.httpClient.get<any>(
      this.hostUrl + 'app/trip/upcoming',
      options
    );
  }

  getTripsOrganizedByStudent(
    studentId: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.hostUrl}app/trips/organized?studentId=${studentId}`
    );
  }

  getListofTrips(
    searchedName: string,
    page: number,
    perPage: number,
    catId: string,
    expand: boolean
  ) {
    var params = new HttpParams()
      .set('page', page)
      .set('perPage', perPage)
      .set('expand', expand);

    if (searchedName != '') {
      params = params.set('name', searchedName);
    }

    if (catId != '') {
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
  getTripDetails(tripId: string) {
    return this.httpClient.get<any>(`${this.hostUrl}app/trip/${tripId}`);
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'app/category');
  }

  getStudentDetailsByEmail(email: string) {
    return this.httpClient.get<any[]>(
      this.hostUrl + `app/student/email/${email}`
    );
  }

  createAttendeeForTrip(tripId: string, studentId: string) {
    const body = {
      tripId: tripId,
      studentId: studentId,
    };

    return this.httpClient.post<any[]>(this.hostUrl + `app/attendee`, body);
  }

  removeAttendeeForTrip(tripId: string, studentId: string) {
    return this.httpClient.delete<any[]>(
      this.hostUrl + `app/attendee/${studentId}/trip/${tripId}`
    );
  }
}
