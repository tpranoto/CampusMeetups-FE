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
  defaultImageUrl: string = 'https://www.seattleu.edu/media/seattle-university/web-redesign---admissions-amp-aid/Hero-CampusOverall.jpg'; // Default image URL

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
          // Map data to match the expected structure
          this.yourTrips = result.map((trip: any) => ({
            name: trip.tripData.name, // Access tripData.name
            location: trip.tripData.location, // Access tripData.location
            imageUrl: trip.tripData.image || this.defaultImageUrl, // Use default image if not provided
            date: new Date(trip.tripData.timestamp).toLocaleDateString(), // Convert timestamp to readable date
            tripId: trip.tripId, // For routing
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

  // Fetch trips for the next 7 days
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
            imageUrl: trip.image || this.defaultImageUrl, // Ensure the default image is used if imageUrl is empty
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

  // Set the default image if the provided image fails to load
  setDefaultImage(event: any): void {
    event.target.src = this.defaultImageUrl;  // Set the default image if the original fails to load
  }
}
