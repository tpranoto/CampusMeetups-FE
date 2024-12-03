import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  // private hostUrl: string = 'http://localhost:8080/';

  private hostUrl: string = 'https://campusmeetups.azurewebsites.net/';

  constructor(private httpClient: HttpClient) {}

  getAttendedTripsForStudent(
    studentId: string,
    limit: string = ''
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
    expand: boolean,
    sort: string
  ): Observable<any> {
    var params = new HttpParams().set('days', numDays).set('expand', expand);
    if (limit != '') {
      params = params.set('perPage', limit);
    }

    if (sort != '' && (sort == 'asc' || sort == 'desc')) {
      params = params.set('sort', sort);
    }
    const options = {
      params: params,
    };

    return this.httpClient.get<any>(
      this.hostUrl + 'app/trip/upcoming',
      options
    );
  }

  getTripsOrganizedByStudent(studentId: string): Observable<any> {
    return this.httpClient.get<any>(
      this.hostUrl + 'app/trip/organized/' + studentId
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

  createTrip(tripData: any) {
    return this.httpClient.post<any[]>(this.hostUrl + `app/trip`, tripData);
  }

  updateTripDetails(tripData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.patch<any[]>(
      this.hostUrl + `app/trip/${tripData.studentId}`,
      tripData,
      {
        headers,
      }
    );
  }

  deleteTrip(tripId: string) {
    return this.httpClient.delete<any[]>(this.hostUrl + `app/trip/${tripId}`);
  }

  getStudentDetailsById(studentId: string) {
    return this.httpClient.get<any[]>(
      this.hostUrl + `app/student/id/${studentId}`
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

  createNewReport(
    reason: string,
    detail: string,
    reporterId: string,
    reportedId: string
  ) {
    const body = {
      reason: reason,
      detail: detail,
      reportedId: reportedId,
      reporterId: reporterId,
    };
    return this.httpClient.post<any[]>(this.hostUrl + `app/report/`, body);
  }

  updateProfile(profileData: any) {
    return this.httpClient.put<any[]>(
      this.hostUrl + `app/student/${profileData.studentId}`,
      profileData
    );
  }

  login() {
    window.location.href = `${this.hostUrl}app/login`;
    return new Observable();
  }

  logout() {
    return this.httpClient.get<any[]>(this.hostUrl + `app/logout`);
  }

  getSessionUserInfo() {
    return this.httpClient.get<any[]>(this.hostUrl + `app/session/user`);
  }
}
