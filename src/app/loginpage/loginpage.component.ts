import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CmproxyService } from '../cmproxy.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  constructor(private router: Router, private proxy$: CmproxyService) {}

  onLoginButtonClick(): void {
    this.proxy$.login().subscribe(() => {
      console.log('Login successful:');
    });
  }
}
