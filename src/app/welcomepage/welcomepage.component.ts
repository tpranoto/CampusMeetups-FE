import { Component } from '@angular/core';
import { CmproxyService } from '../services/cmproxy.service';
import { AttendedTripsData, TripsData } from '../models/models';
import { UserService } from '../services/user.service';
import { NotificationdialogService } from '../services/notificationdialog.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css',
})
export class WelcomepageComponent {
  trips: AttendedTripsData[] = [];
  upcomingDays: string = '7';
  upcomingTrips: TripsData[] = [];
  user: any = {};

  constructor(
    private proxy$: CmproxyService,
    private userServ: UserService,
    private notifServ: NotificationdialogService
  ) {
    this.trackUserSession();
    this.fetchAttendedTrips();
    this.fetchUpcomingActiveTrips();
  }

  // Fetch trips for the specific student
  fetchAttendedTrips(): void {
    this.proxy$
      .getAttendedTripsForStudent(this.user.studentId, '4')
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.trips = result.map((trip: any) => trip.tripData);
        }
      });
  }

  // Fetch trips for the next 7 days
  fetchUpcomingActiveTrips(): void {
    this.proxy$
      .getLimitedUpcomingActiveTrips(this.upcomingDays, '4', true)
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.upcomingTrips = result.data;
        }
      });
  }

  trackUserSession(): void {
    this.userServ.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
