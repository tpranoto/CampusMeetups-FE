import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';

// interface Trip {
//   tripId: string;
//   name: string;
//   description: string;
//   timestamp: Date;
//   status: string;
//   organizerId: string;
// }

@Component({
  selector: 'app-triplist',
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css',
})
export class TriplistComponent {
  response: any = {};
  trips: any = [];
  page: number = 0;
  perPage: number = 12;
  categoryId: string = '';
  nextPage: string | null = null;
  prevPage: string | null = null;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private router: Router, private proxy$: CmproxyService) {
    this.fetchTrips(this.page, this.perPage, this.categoryId, true);
  }

  ngOnInit() {}

  clickNextPage(): void {
    var url: string = this.nextPage || '';
    this.fetchTrips(this.page, this.perPage, this.categoryId, true, url);
    this.scrollToTop();
  }

  clickPrevPage(): void {
    var url: string = this.prevPage || '';
    this.fetchTrips(this.page, this.perPage, this.categoryId, true, url);
    this.scrollToTop();
  }

  fetchTrips(
    page: number,
    perPage: number,
    catId: string,
    expand: boolean,
    url?: string
  ) {
    if (url) {
      this.proxy$.getListOfTripsByUrl(url).subscribe((result: any[]) => {
        this.response = result;
        this.page = this.response.page;
        this.trips = this.response.data;
        this.nextPage = this.response.nextPage;
        this.prevPage = this.response.prevPage;
        console.log('retrieved data from server.');
      });
    } else {
      this.proxy$
        .getListofTrips(page, perPage, catId, expand)
        .subscribe((result: any[]) => {
          this.response = result;
          this.page = this.response.page;
          this.trips = this.response.data;
          this.nextPage = this.response.nextPage;
          this.prevPage = this.response.prevPage;
          console.log('retrieved data from server.');
        });
    }
  }

  scrollToTop(): void {
    this.scrollTarget.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  navigateToTripDetails(tripId: string): void {
    this.router.navigate(['/trip', tripId]);
  }
}
