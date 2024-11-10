import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-triplist',
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css',
})
export class TriplistComponent {
  response: any = {};
  trips: any = [];

  constructor(private router: Router, proxy$: CmproxyService) {
    proxy$.getListofTrips().subscribe((result: any[]) => {
      this.response = result;
      this.trips = this.response.data;
      //this.dataSource.sort = this.sort;
      console.log('retrieved data from server.');
    });
  }

  ngOnInit() {}

  clickEvent(): void {
    this.router.navigate(['']);
  }
}
