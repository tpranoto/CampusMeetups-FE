import { Component } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { AttendedTripsData, TripsData } from '../models/models';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationdialogComponent } from '../notificationdialog/notificationdialog.component';

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
    private dialog: MatDialog
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
          this.showNotificationDialog(result.error, 'fail');
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
          this.showNotificationDialog(result.error, 'fail');
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

  showNotificationDialog(content: string, type: string): void {
    const dialogRef = this.dialog.open(NotificationdialogComponent, {
      data: {
        data: content,
        type: type,
      },
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1000);
  }
}
