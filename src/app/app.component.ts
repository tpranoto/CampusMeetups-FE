import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from './cmproxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'CampusMeetups';
  searchName: string = '';

  constructor(private router: Router, private proxy$: CmproxyService) {}

  onInputChange(event: any) {
    this.searchName = event.target.value;
  }

  onInputEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchName != '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchName },
      });
    }
  }

  OnSearchClick(): void {
    if (this.searchName != '') {
      this.router.navigate(['/trip'], {
        queryParams: { name: this.searchName },
      });
    }
  }
}
