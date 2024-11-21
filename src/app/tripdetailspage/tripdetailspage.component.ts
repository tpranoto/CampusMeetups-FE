import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';
import { CookiesService } from '../cookie.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendeelistdialogComponent } from '../attendeelistdialog/attendeelistdialog.component';
import { NotificationdialogComponent } from '../notificationdialog/notificationdialog.component';

@Component({
  selector: 'app-tripdetailspage',
  templateUrl: './tripdetailspage.component.html',
  styleUrls: ['./tripdetailspage.component.css'],
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
    private cookieServ: CookiesService,
    private dialog: MatDialog
  ) {
    const userDt = this.cookieServ.getCookie('user');
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
          this.showNotificationDialog(
            `failed to leave the trip, please try again.`
          );
        } else {
          this.hasJoinedTrip = false;
          this.showNotificationDialog(
            `You have left the trip: ${this.trip.name}.`
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
          this.showNotificationDialog(
            `failed to leave the trip, please try again.`
          );
        } else {
          this.hasJoinedTrip = true;
          this.showNotificationDialog(
            `You have joined the trip: ${this.trip.name}.`
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
      this.showNotificationDialog(
        'Share functionality is not supported in your browser.'
      );
    }
  }

  checkJoinedTrip(): void {
    this.isHostOfTrip = this.trip.organizerId === this.userId;
    this.hasJoinedTrip = this.attendeeList.some(
      (attendee: any) => attendee.studentId === this.userId
    );
  }

  showNotificationDialog(content: string): void {
    const dialogRef = this.dialog.open(NotificationdialogComponent, {
      width: '30vw',
      position: {
        top: '1vh',
      },
      data: {
        data: content,
      },
      backdropClass: 'notification-dialog-backdrop',
    });
  }
}
