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
  categories: any = [];
  page: number = 0;
  perPage: number = 12;
  categoryId: string = '';
  nextPage: string | null = null;
  prevPage: string | null = null;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  isScrollable: boolean = false; // Track if content is scrollable
  filteredTrips: any = []; 
  selectedFilter: string = '';  

  constructor(private router: Router, private proxy$: CmproxyService) {
    this.fetchTrips(this.page, this.perPage, this.categoryId, true);
    this.filteredTrips = null;
  }
  ngOnInit(): void {
    this.fetchCategories();
  }

  ngAfterViewInit(): void {
    this.checkIfScrollable();
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'def_trip.jpg';
  }

  fetchCategories(): void { this.proxy$.getCategories().subscribe((result: any[]) => {
    this.categories = result;
    console.log('retrieved data from server.');
    console.log(result);
  });
  }

onSelect(category: any): void {
  if (category) {
    this.filteredTrips = this.trips.filter((trip: { categoryData: { name: string; }; }) => trip.categoryData.name === category.name);
  } else {
    this.filteredTrips = this.trips;
  }
  console.log('Filtered trips:', this.filteredTrips); // Log to check if filteredTrips is being updated
}


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

        this.filteredTrips = this.trips;
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

          this.filteredTrips = this.trips;
        });
    }
  }

  selectCategory(categoryId: string): void {
    this.categoryId = categoryId;
    this.page = 0; // Reset pagination when changing category
    this.fetchTrips(this.page, this.perPage, this.categoryId, true);
  }
   // Method to reset the filter and show all trips
   resetFilter(): void {
    this.filteredTrips = this.trips;  // Reset the filtered trips to all trips
    this.selectedFilter = '';  // Clear the selected filter (if any)
    console.log('Filter reset to show all trips');
  }
  checkIfScrollable(): void {
    const contentElement = this.scrollTarget.nativeElement;
    this.isScrollable = contentElement.scrollHeight > contentElement.clientHeight; // Check if scroll height is greater than the client height
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

  // Scroll down the trip list
  scrollDown(): void {
    const contentElement = this.scrollTarget.nativeElement;
    contentElement.scrollBy({
      top: 200, 
      behavior: 'smooth',
    });
  }
}