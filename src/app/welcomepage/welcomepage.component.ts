import { Component } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { CookiesService } from '../cookie.service';
import { AttendedTripsData, TripsData, StudentDetails } from '../models/models';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css',
})
export class WelcomepageComponent {
  trips: AttendedTripsData[] = [];
  upcomingDays: string = '7';
  upcomingTrips: TripsData[] = [];
  loggedInEmail: string = 'oliviajohnson@seattleu.edu'; // static for now
  userData: any = {};
  studentId: string = '';

  constructor(
    private proxy$: CmproxyService,
    private cookieServ: CookiesService
  ) {
    this.fetchStudentData();
    this.fetchUpcomingActiveTrips();
  }

  // Fetch trips for the specific student
  fetchAttendedTrips(): void {
    this.proxy$
      .getAttendedTripsForStudent(this.userData.studentId, '4')
      .subscribe((result: any) => {
        this.trips = result.map((trip: any) => trip.tripData);
      });
  }

  // Fetch trips for the next 7 days
  fetchUpcomingActiveTrips(): void {
    this.proxy$
      .getLimitedUpcomingActiveTrips(this.upcomingDays, '4', true)
      .subscribe((result: any) => {
        this.upcomingTrips = result.data;
      });
  }

  fetchStudentData(): void {
    this.proxy$
      .getStudentDetailsByEmail(this.loggedInEmail)
      .subscribe((result: any) => {
        this.cookieServ.setCookie('user', result);
        this.userData = result;
        this.fetchAttendedTrips();
      });
  }
}
