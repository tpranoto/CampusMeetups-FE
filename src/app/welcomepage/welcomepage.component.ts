import { Component, OnInit } from '@angular/core';
import { CmproxyService } from '../cmproxy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {
  yourTrips: any[] = []; // Array to hold all trip data
  next7DaysTrips: any[] = []; // Array to hold trips for the next 7 days

  constructor(
    private proxyService: CmproxyService,
    private route: ActivatedRoute  // Inject ActivatedRoute to access route params if needed
  ) { }

  ngOnInit(): void {
    this.fetchYourTrips(); // Fetch all trips
    this.fetchNext7DaysTrips(); // Fetch trips for the next 7 days
  }

  fetchYourTrips(): void {
    this.proxyService.getYourTrips().subscribe(
      (result: any) => {
        console.log('API Response:', result); // Log the raw response to debug
        this.yourTrips = result.data;  // Assuming result.data contains the trips array
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  fetchNext7DaysTrips(): void {
    this.proxyService.getNext7DaysTrips().subscribe(
      (result: any) => {
        console.log('API Response:', result); // Log the raw response to debug
        this.next7DaysTrips = result.data;  // Assuming result.data contains the trips for the next 7 days
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }
}
