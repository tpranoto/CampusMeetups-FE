import { Component } from '@angular/core';
import { CmproxyService } from '../cmproxy.service'; // Assuming your service is in the same folder
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtrippage',
  templateUrl: './createtrippage.component.html',
  styleUrls: ['./createtrippage.component.css'],
})
export class CreatetrippageComponent {
  trip = {
    name: '',
    description: '',
    location: '',
    image: '',
    date: '',
    organizerId: '',
    categoryId: '',
  };

  errorMessage: string | null = null;

  constructor(private cmproxyService: CmproxyService, private router: Router) { }

  onSubmit() {
    // Ensure the date is properly formatted before submission
    const tripData = {
      ...this.trip,
      date: new Date(this.trip.date).toISOString(),
    };

    this.cmproxyService.createTrip(tripData).subscribe(
      (response) => {
        // Extract tripId and show it in a success message
        const tripId = response.tripId; // Ensure this matches the backend response
        if (tripId) {
          alert(`Trip created successfully! Trip ID: ${tripId}`);
        } else {
          alert('Trip created successfully, but trip ID is not available.');
        }
        this.router.navigate(['/trips']); // Redirect to trips page
      },
      (error) => {
        console.error('Error creating trip:', error);
        this.errorMessage = error.error.message || 'Error creating trip';
        alert(`Error: ${this.errorMessage}`);
      }
    );
  }
}
