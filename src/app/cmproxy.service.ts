import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmproxyService {
  // Server base URL
  private readonly hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch trips for a specific student by their studentId.
   * @param studentId - The ID of the student whose trips to fetch.
   * @returns An Observable of the student's trips.
   */
  getYourTripsForStudent(studentId: string): Observable<any> {
    const url = `${this.hostUrl}app/attendee/${studentId}`;
    console.log(`Fetching trips for student ID: ${studentId}, URL: ${url}`);
    return this.httpClient.get<any>(url);
  }

  /**
   * Fetch upcoming trips within the next 7 days.
   * Includes pagination and sorting options.
   * @returns An Observable of upcoming trips.
   */
  retrieveUpcomingActiveTrips(): Observable<any> {
    const url = `${this.hostUrl}app/trip/upcoming?days=7&perPage=5&expand=true&sort=desc`;
    console.log(`Fetching upcoming trips: URL: ${url}`);
    return this.httpClient.get<any>(url);
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

  getListOfTripsByUrl(url: string) {
    return this.httpClient.get<any[]>(url);
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'app/category');
  }

  getStudentDetailsByEmail(email: string) {
    return this.httpClient.get<any[]>(
      this.hostUrl + `app/student/email/${email}`
    );
  }
}
