import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';
import { CookiesService } from '../cookie.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendeelistdialogComponent } from '../attendeelistdialog/attendeelistdialog.component';

@Component({
  selector: 'app-tripdetailspage',
  templateUrl: './tripdetailspage.component.html',
  styleUrls: ['./tripdetailspage.component.css'],
})
export class TripdetailspageComponent implements OnInit {
  trip: any = {};
  userId: string = '';
  attendeeList: any = [];

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

  ngOnInit(): void {}

  fetchTripDetails(tripId: string): void {
    this.proxy$.getTripDetails(tripId).subscribe((result: any) => {
      this.trip = result;
      this.attendeeList.push({
        studentId: this.trip.organizerId,
        fname: this.trip.organizerData.fname,
        lname: this.trip.organizerData.lname,
        image: this.trip.organizerData.image,
        host: true,
      });
      this.attendeeList.push(...this.trip.attendees);
    });
  }

  onAttendeeListClick(): void {
    const dialogRef = this.dialog.open(AttendeelistdialogComponent, {
      width: '400px',
      data: {
        data: this.attendeeList,
      },
      panelClass: 'attendee-list-dialog', // Custom styles for dialog
      backdropClass: 'attendee-list-dialog-backdrop',
    });
  }

  joinTrip(): void {
    console.log(`Joining trip: ${this.trip.name}`);
    alert(`You have joined the trip: ${this.trip.name}`);
  }

  // Share functionality
  shareTrip(): void {
    if (navigator.share) {
      navigator
        .share({
          title: this.trip.name,
          text: this.trip.description,
          url: window.location.href,
        })
        .then(() => console.log('Trip shared successfully!'))
        .catch((error) => console.error('Error sharing trip:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Share functionality is not supported in your browser.');
    }
  }
}
