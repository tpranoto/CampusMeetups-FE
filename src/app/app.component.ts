import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from './cmproxy.service';
import { CookiesService } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchName: string = '';
  loggedInEmail = 'oliviajohnson@seattleu.edu'; // static for now
  userId: string = '';
  fName: string = '';
  lName: string = '';
  pImageUrl: string = '';

  constructor(
    private router: Router,
    private proxy$: CmproxyService,
    private cookieServ: CookiesService
  ) {
    this.fetchStudentData();
  }

  onInputChange(event: any) {
    this.searchName = event.target.value;
  }

  onInputEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchName != '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchName },
      });
      this.searchName = '';
    }
  }

  OnSearchClick(): void {
    if (this.searchName != '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchName },
      });
      this.searchName = '';
    }
  }

  fetchStudentData(): void {
    this.proxy$
      .getStudentDetailsByEmail(this.loggedInEmail)
      .subscribe((result: any) => {
        this.cookieServ.setCookie('user', result);
        this.userId = result.studentId;
        this.fName = result.fname;
        this.lName = result.lname;
        this.pImageUrl = result.image;
      });
  }
}
