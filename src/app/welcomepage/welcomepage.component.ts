import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
})
export class WelcomepageComponent implements OnInit {
  yourTrips: any[] = []; // Array to hold trip data
  UpcomingActiveTrips: any[] = []; // Array to hold trips for the next 7 days
  studentId: string = '2b8f3c2a1d6e9c4f3b5a0e8c1d7b3a9e'; // Replace with actual student ID

  constructor(private proxyService: CmproxyService) { }

  ngOnInit(): void {
    this.fetchYourTrips();
    this.fetchUpcomingActiveTrips();
  }

  // Fetch trips for the specific student
  fetchYourTrips(): void {
    console.log('Fetching trips for student with ID:', this.studentId);
    this.proxyService.getYourTripsForStudent(this.studentId).subscribe(
      (result: any) => {
        console.log('Your Trips API Response:', result); // Debugging the API response
        if (result && result.length > 0) {
          // The result is an array of trips
          this.yourTrips = result.map((trip: any) => ({
            name: trip.trip.name,
            location: trip.trip.location,
            imageUrl: trip.trip.image,
            date: new Date(trip.trip.date.$date).toLocaleDateString(), // Convert MongoDB date format to readable date
          }));
        } else {
          console.log('No data found for trips.');
        }
      },
      (error) => {
        console.error('Error fetching your trips:', error);
      }
    );
  }

  fetchUpcomingActiveTrips(): void {
    console.log('Fetching trips for the next 7 days');

    this.proxyService.retrieveUpcomingActiveTrips(
    ).subscribe(
      (result: any) => {
        console.log('Next 7 Days Trips API Response:', result);
        if (result && result.length > 0) {
          this.UpcomingActiveTrips = result.map((trip: any) => ({
            name: trip.trip.name,
            location: trip.trip.location,
            imageUrl: trip.trip.image,
            date: new Date(trip.trip.date.$date).toLocaleDateString(), // Convert MongoDB date format to readable date
          }));
        } else {
          console.log('No trips found for the next 7 days.');
        }
      },
      (error) => {
        console.error('Error fetching next 7 days trips:', error);
      }
    );
  }

}
