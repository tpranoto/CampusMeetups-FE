import { Component } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component'; // Import AppComponent

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
    categoryId: '',
  };

  errorMessage: string | null = null;

  constructor(
    private cmproxyService: CmproxyService,
    private router: Router,
    private appComponent: AppComponent // Inject AppComponent
  ) { }

  onSubmit() {
    const organizerId = this.appComponent.userId; // Get the logged-in user's ID

    const tripData = {
      ...this.trip,
      date: new Date(this.trip.date).toISOString(),
      organizerId, // Include organizerId from AppComponent
    };

    this.cmproxyService.createTrip(tripData).subscribe(
      (response) => {
        const tripId = response.tripId;
        if (tripId) {
          alert(`Trip created successfully! Trip ID: ${tripId}`);
          this.router.navigate(['/trip-detail', tripId]); // Navigate to the trip details page
        } else {
          alert('Trip created successfully, but trip ID is not available.');
        }
      },
      (error) => {
        console.error('Error creating trip:', error);
        this.errorMessage = error.error.message || 'Error creating trip';
        alert(`Error: ${this.errorMessage}`);
      }
    );
  }
}
