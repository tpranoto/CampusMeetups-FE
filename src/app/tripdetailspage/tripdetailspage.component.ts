import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../services/cmproxy.service';
import { UserService } from '../services/user.service';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendeelistdialogComponent } from '../attendeelistdialog/attendeelistdialog.component';
import { ReportdialogComponent } from '../reportdialog/reportdialog.component';

@Component({
  selector: 'app-tripdetailspage',
  templateUrl: './tripdetailspage.component.html',
  styleUrl: './tripdetailspage.component.css',
})
export class TripdetailspageComponent {
  trip: any = {};
  userId: string = '';
  attendeeList: any = [];
  isHostOfTrip: boolean = false;
  hasJoinedTrip: boolean = false;

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private proxy$: CmproxyService,
    private userServ: UserService,
    private dialog: MatDialog,
    private notifServ: NotificationdialogService
  ) {
    const userDt = this.userServ.user;
    this.userId = userDt.studentId;
    const tripId = actRouter.snapshot.params['tripId'];
    this.fetchTripDetails(tripId);
  }

  fetchTripDetails(tripId: string): void {
    this.proxy$.getTripDetails(tripId).subscribe((result: any) => {
      this.trip = result;
      this.attendeeList = [];
      this.attendeeList.push({
        studentId: this.trip.organizerId,
        fname: this.trip.organizerData.fname,
        lname: this.trip.organizerData.lname,
        image: this.trip.organizerData.image,
        host: true,
      });
      this.attendeeList.push(...this.trip.attendees);
      this.checkJoinedTrip();
    });
  }

  onAttendeeListClick(): void {
    const dialogRef = this.dialog.open(AttendeelistdialogComponent, {
      width: '30vw',
      data: {
        data: this.attendeeList,
      },
      backdropClass: 'attendee-list-dialog-backdrop',
    });
  }

  onEditTripClick(tripId: string): void {
    this.router.navigate(['/trip/edit', tripId]);
  }

  onLeaveTripClick(): void {
    this.proxy$
      .removeAttendeeForTrip(this.trip.tripId, this.userId)
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.hasJoinedTrip = false;
          this.notifServ.showNotificationDialog(
            `You have left the trip: ${this.trip.name}.`,
            'success'
          );
          this.fetchTripDetails(this.trip.tripId);
        }
      });
  }

  onJoinTripClick(): void {
    this.proxy$
      .createAttendeeForTrip(this.trip.tripId, this.userId)
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.hasJoinedTrip = true;
          this.notifServ.showNotificationDialog(
            `You have joined the trip: ${this.trip.name}.`,
            'success'
          );
          this.fetchTripDetails(this.trip.tripId);
        }
      });
  }

  onShareTripClick(): void {
    if (navigator.share) {
      navigator.share({
        title: this.trip.name,
        text: this.trip.description,
        url: window.location.href,
      });
    } else {
      this.notifServ.showNotificationDialog(
        'Share functionality is not supported in your browser.',
        'fail'
      );
    }
  }

  onReportTripClick(): void {
    const dialogRef = this.dialog.open(ReportdialogComponent, {
      width: '50vw',
      data: { reporterId: this.userId, reportedId: this.trip.organizerId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Report submitted:', result);
        // Handle the result (reason and details)
      } else {
        console.log('Report dialog was closed without submission');
      }
    });
  }

  checkJoinedTrip(): void {
    this.isHostOfTrip = this.trip.organizerId === this.userId;
    this.hasJoinedTrip = this.attendeeList.some(
      (attendee: any) => attendee.studentId === this.userId
    );
  }
}
