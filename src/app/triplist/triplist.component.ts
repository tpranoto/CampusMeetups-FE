import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  categoryName: string = 'Select Category';
  categoryId: string = '';
  nextPage: string | null = null;
  prevPage: string | null = null;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  isScrollable: boolean = false; // Track if content is scrollable
  searchName: string = '';

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private proxy$: CmproxyService
  ) {
    this.page = 0;
    this.fetchTrips(
      this.searchName,
      this.page,
      this.perPage,
      this.categoryId,
      true
    );
    this.fetchCategories();
  }

  ngOnInit(): void {
    this.page = 0;
    this.actRouter.queryParams.subscribe((params) => {
      this.searchName = params['name'] || '';
      this.page = 0;
      if (this.searchName != null) {
        this.fetchTrips(
          this.searchName,
          this.page,
          this.perPage,
          this.categoryId,
          true
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.checkIfScrollable();
  }

  onImageError(event: Event): void {
    // set up default image if some error happened on fetching image
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'def_trip.jpg';
  }

  onCategorySelect(category: any): void {
    // get filtered trips when a category is selected
    this.categoryName = category.name;
    this.categoryId = category.categoryId;
    if (category.name != 'Select Category') {
      this.fetchTrips(this.searchName, 0, this.perPage, this.categoryId, true);
    } else {
      this.categoryId = '';
      this.fetchTrips(this.searchName, 0, this.perPage, this.categoryId, true);
    }
  }

  removeFilterKeyword() {
    this.searchName = '';
    this.router.navigate(['/trip']);
  }

  clickNextPage(): void {
    var url: string = this.nextPage || '';
    this.fetchTrips(
      this.searchName,
      this.page,
      this.perPage,
      this.categoryId,
      true,
      url
    );
    this.scrollToTop();
  }

  clickPrevPage(): void {
    var url: string = this.prevPage || '';
    this.fetchTrips(
      this.searchName,
      this.page,
      this.perPage,
      this.categoryId,
      true,
      url
    );
    this.scrollToTop();
  }

  fetchCategories(): void {
    this.proxy$.getCategories().subscribe((result: any[]) => {
      this.categories = [{ name: 'Select Category' }, ...result];
    });
  }

  fetchTrips(
    searchedName: string,
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
      });
    } else {
      this.proxy$
        .getListofTrips(searchedName, page, perPage, catId, expand)
        .subscribe((result: any[]) => {
          this.response = result;
          this.page = this.response.page;
          this.trips = this.response.data;
          this.nextPage = this.response.nextPage;
          this.prevPage = this.response.prevPage;
        });
    }
  }

  checkIfScrollable(): void {
    const contentElement = this.scrollTarget.nativeElement;
    this.isScrollable =
      contentElement.scrollHeight > contentElement.clientHeight; // Check if scroll height is greater than the client height
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
