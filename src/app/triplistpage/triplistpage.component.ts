import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';
import { TripsData, CategoryDetails } from '../models/models';

@Component({
  selector: 'app-triplistpage',
  templateUrl: './triplistpage.component.html',
  styleUrl: './triplistpage.component.css',
})
export class TriplistpageComponent {
  trips: TripsData[] = [];
  categories: CategoryDetails[] = [];
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

    this.fetchTrips(
      this.searchName,
      this.page,
      this.perPage,
      this.categoryId,
      true
    );
    this.fetchCategories();
  }

  onCategorySelect(category: any): void {
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
      this.proxy$.getListOfTripsByUrl(url).subscribe((result: any) => {
        this.page = result.page;
        this.trips = result.data;
        this.nextPage = result.nextPage;
        this.prevPage = result.prevPage;
      });
    } else {
      this.proxy$
        .getListofTrips(searchedName, page, perPage, catId, expand)
        .subscribe((result: any) => {
          this.page = result.page;
          this.trips = result.data;
          this.nextPage = result.nextPage;
          this.prevPage = result.prevPage;
        });
    }
  }

  scrollToTop(): void {
    this.scrollTarget.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
