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
  response: any = {};
  fName = '';
  lName = '';
  pImageUrl = '';

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
      .subscribe((result: any[]) => {
        this.cookieServ.setCookie('user', result);
        this.response = result;
        this.fName = this.response.fname;
        this.lName = this.response.lname;
        this.pImageUrl = this.response.image;
      });
  }
}
