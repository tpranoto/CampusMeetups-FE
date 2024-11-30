import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';  // Import necessary classes
import { CmproxyService } from './services/cmproxy.service';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';  // Filter to track navigation end

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchTripName: string = '';
  user: any = {};
  showNavbar: boolean = true;  // Flag to control navbar visibility

  constructor(
    private router: Router,
    private proxy$: CmproxyService,
    private userServ: UserService
  ) {
    this.trackUserSession();

    // Detect route changes to show or hide navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only handle NavigationEnd events
    ).subscribe(event => {
      // Hide navbar when navigating to '/login'
      this.showNavbar = event.url !== '/login';
    });
  }

  onInputChange(event: any) {
    this.searchTripName = event.target.value;
  }

  onInputEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchTripName !== '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchTripName },
      });
      this.searchTripName = '';
    }
  }

  onSearchClick(): void {
    if (this.searchTripName !== '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchTripName },
      });
      this.searchTripName = '';
    }
  }

  onLogoutClick(): void {
    this.proxy$.logout().subscribe(() => {
      this.userServ.clearUser();
    });
  }

  trackUserSession(): void {
    this.userServ.user$.subscribe((user) => {
      this.user = user;
      if (this.user == null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
