import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
})
export class WelcomepageComponent implements OnInit {
  yourTrips: any[] = []; // Array to hold trip data
  next7DaysTrips: any[] = []; // Array to hold trips for the next 7 days
  studentId: string = '8a4f944c993b11de0e989cdcb1a3a21f'; // Replace with actual student ID

  constructor(private proxyService: CmproxyService) { }

  ngOnInit(): void {
    this.fetchYourTrips();
    this.fetchNext7DaysTrips();
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

  // Fetch trips for the next 7 days (same structure can be applied here)
  fetchNext7DaysTrips(): void {
    console.log('Fetching trips for the next 7 days');
    this.proxyService.getNext7DaysTrips().subscribe(
      (result: any) => {
        console.log('Next 7 Days Trips API Response:', result);
        if (result && result.data) {
          this.next7DaysTrips = result.data;
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
