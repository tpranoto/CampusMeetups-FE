import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  trip: any;
  tripId: string = '2d5c7b9e4a1f0e3c6b8d2a1f4e5c9b3a'; // Replace with actual dynamic tripId

  constructor(private cmproxyService: CmproxyService) { }

  ngOnInit(): void {
    this.fetchTripDetails();
  }

  fetchTripDetails(): void {
    this.cmproxyService.getTripDetails(this.tripId).subscribe(
      (data) => {
        this.trip = data; // Set the trip data
      },
      (error) => {
        console.error('Error fetching trip details:', error);
      }
    );
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
