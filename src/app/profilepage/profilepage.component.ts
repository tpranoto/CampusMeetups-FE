import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { CookiesService } from '../cookie.service';
import { TripsData, StudentDetails } from '../models/models';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  joinedTrips: TripsData[] = [];
  organizedTrips: TripsData[] = [];
  loggedInEmail: string = 'oliviajohnson@seattleu.edu'; // Replace with dynamic email
  userData: StudentDetails | any = {};
  studentId: string = '';
  pImageUrl: string = ''; // Placeholder or default image URL
  fName: string = 'John'; // Default or fetched first name
  lName: string = 'Doe';  // Default or fetched last name

  constructor(
    private proxy$: CmproxyService,
    private cookieServ: CookiesService
  ) { }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  // Fetch student details and use the data to load trips
  fetchStudentData(): void {
    this.proxy$
      .getStudentDetailsByEmail(this.loggedInEmail)
      .subscribe((result: any) => {
        this.cookieServ.setCookie('user', result);
        this.userData = result;
        this.studentId = result.studentId;

        // Fetch trips after obtaining the user data
        this.fetchJoinedTrips();
        this.fetchOrganizedTrips();
      });
  }

  changeProfileImage(): void {
    console.log('Change Profile Image button clicked');
    // Add logic to update the profile image
  }

  // Fetch trips joined by the user
  fetchJoinedTrips(): void {
    this.proxy$
      .getAttendedTripsForStudent(this.studentId, '5') // Adjust number of trips to fetch
      .subscribe((result: any) => {
        this.joinedTrips = result.map((trip: any) => trip.tripData);
      });
  }

  // Fetch trips organized by the user
  fetchOrganizedTrips(): void {
    this.proxy$
      .getTripsOrganizedByStudent(this.studentId) // Adjust API method if needed
      .subscribe((result: any) => {
        this.organizedTrips = result;
      });
  }

  reportUser() {
    console.log('User reported.');
    // Add logic to handle user reporting
  }

  blockUser() {
    console.log('User blocked.');
    // Add logic to handle user blocking
  }

}
