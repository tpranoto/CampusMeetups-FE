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
  studentId: string = 'c1e4f7b8d0c9a5e1b2f6a8e3d4c5b0f7'; // Replace with actual student ID

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

    this.proxyService.retrieveUpcomingActiveTrips().subscribe(
      (result: any) => {
        console.log('Upcoming Active Trips API Response:', result);
        if (result && result.data && result.data.length > 0) {
          this.UpcomingActiveTrips = result.data.map((trip: any) => ({
            tripId: trip.tripId, // Use tripId for routing
            name: trip.name,
            location: trip.location,
            imageUrl: trip.image, // Ensure this points to the correct image URL
            description: trip.description,
            date: new Date(trip.timestamp).toLocaleDateString(), // Convert timestamp to readable date
          }));
        } else {
          console.log('No trips found for the next 7 days.');
        }
      },
      (error) => {
        console.error('Error fetching upcoming active trips:', error);
      }
    );
  }


}
