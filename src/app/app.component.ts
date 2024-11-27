import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from './cmproxy.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchTripName: string = '';
  user: any = {};

  constructor(
    private router: Router,
    private proxy$: CmproxyService,
    private userServ: UserService
  ) {
    this.trackUserSession();
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
}
