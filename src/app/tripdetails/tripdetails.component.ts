import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  trip: any;
  tripId: string = ''; // Initially empty, will be set dynamically from the route

  constructor(
    private cmproxyService: CmproxyService,
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) { }

  ngOnInit(): void {
    // Get the tripId from the route parameters
    this.activatedRoute.paramMap.subscribe(params => {
      const tripId = params.get('tripId'); // Extract 'tripId' from the route parameters
      console.log('Extracted tripId from route:', tripId); // Log the extracted tripId

      if (tripId) {
        this.tripId = tripId;
        this.fetchTripDetails();
      } else {
        console.error('No tripId found in route');
      }
    });
  }

  fetchTripDetails(): void {
    if (this.tripId) {
      console.log('Fetching trip details for tripId:', this.tripId); // Log the tripId before making the request
      this.cmproxyService.getTripDetails(this.tripId).subscribe(
        (data) => {
          console.log('Fetched trip details:', data); // Log the fetched data
          this.trip = data; // Set the trip data
        },
        (error) => {
          console.error('Error fetching trip details:', error);
        }
      );
    } else {
      console.error('tripId is empty, unable to fetch trip details');
    }
  }

  joinTrip(): void {
    console.log(`Joining trip: ${this.trip.name}`);
    alert(`You have joined the trip: ${this.trip.name}`);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/def_trip.jpg'; // Default image in case of error
  }
}
