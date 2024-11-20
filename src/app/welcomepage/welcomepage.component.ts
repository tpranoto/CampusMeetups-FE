import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { CookiesService } from '../cookie.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
})
export class WelcomepageComponent implements OnInit {
  trips: any = [];
  upcomingDays: string = '7';
  upcomingTrips: any = [];
  studentName: string = 'User';
  studentId: string = '';

  constructor(
    private proxy$: CmproxyService,
    private cookieServ: CookiesService
  ) {
    var userDt = this.cookieServ.getCookie('user');
    this.studentName = userDt.fname;
    this.studentId = userDt.studentId;
    this.fetchAttendedTrips();
    this.fetchUpcomingActiveTrips();
  }

  ngOnInit(): void {}

  // Fetch trips for the specific student
  fetchAttendedTrips(): void {
    this.proxy$
      .getAttendedTripsForStudent(this.studentId, '4')
      .subscribe((result: any) => {
        this.trips = result.map((trip: any) => trip.tripData);
      });
  }

  // Fetch trips for the next 7 days
  fetchUpcomingActiveTrips(): void {
    this.proxy$
      .retrieveLimitedUpcomingActiveTrips(this.upcomingDays, '4', true)
      .subscribe((result: any) => {
        this.upcomingTrips = result.data;
      });
  }
}
