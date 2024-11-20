import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recttripcard',
  templateUrl: './recttripcard.component.html',
  styleUrl: './recttripcard.component.css',
})
export class RecttripcardComponent {
  @Input() trip: any = {};

  constructor(private router: Router) {}

  navigateToTripDetails(tripId: string): void {
    this.router.navigate(['/trip', tripId]);
  }
}
