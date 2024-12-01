import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CmproxyService } from './services/cmproxy.service';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchTripName: string = '';
  user: any = {};
  currentPath: string = '';

  constructor(
    private router: Router,
    private proxy$: CmproxyService,
    private userServ: UserService
  ) {
    this.trackUserSession();
    this.trackCurrentPage();
  }

  onInputChange(event: any) {
    this.searchTripName = event.target.value;
  }

  onInputEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchTripName != '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchTripName },
      });
      this.searchTripName = '';
    }
  }

  onSearchClick(): void {
    if (this.searchTripName != '') {
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

  trackCurrentPage(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
      });
  }
}
