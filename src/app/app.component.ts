import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CmproxyService } from './services/cmproxy.service';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreatetripdialogComponent } from './createtripdialog/createtripdialog.component';
import { AboutdialogComponent } from './aboutdialog/aboutdialog.component';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { TnsdialogComponent } from './tnsdialog/tnsdialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchTripName: string = '';
  user: any = {};
  currentPath: string = '';

  constructor(
    private router: Router,
    private proxy$: CmproxyService,
    private userServ: UserService,
    private dialog: MatDialog
  ) {
    this.trackUserSession();
    this.trackCurrentPage();
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

  onLoginButtonClick(): void {
    this.proxy$.login().subscribe(() => {});
  }

  onLogoutClick(): void {
    this.proxy$.logout().subscribe(() => {
      this.userServ.clearUser();
    });
  }

  trackUserSession(): void {
    this.proxy$.getSessionUserInfo().subscribe((result: any) => {
      if (result.error) {
        this.router.navigate(['/login']);
      } else {
        this.userServ.user$.subscribe((user) => {
          this.user = user;
          if (this.user == null) {
            this.router.navigate(['/login']);
          }
        });
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

  onCreateTripClick(): void {
    const dialogRef = this.dialog.open(CreatetripdialogComponent, {
      width: '50vw',
      height: '600px',
      position: {
        top: '8vh',
      },
    });
  }

  onAboutClick(): void {
    const dialogRef = this.dialog.open(AboutdialogComponent, {
      width: '50vw',
      height: '80vh',
      position: {
        top: '8vh',
      },
    });
  }

  onHelpClick(): void {
    const dialogRef = this.dialog.open(HelpdialogComponent, {
      width: '50vw',
      height: '80vh',
      position: {
        top: '8vh',
      },
    });
  }

  onTnSClick(): void {
    const dialogRef = this.dialog.open(TnsdialogComponent, {
      width: '50vw',
      height: '80vh',
      position: {
        top: '8vh',
      },
    });
  }
}
