import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  // Set a cookie with a specified expiration (in days)
  setCookie(name: string, value: object, days: number = 1): void {
    this.cookieService.set(name, JSON.stringify(value), days);
  }

  // Get the value of a cookie by name
  getCookie(name: string): any {
    return JSON.parse(this.cookieService.get(name));
  }

  // Delete a cookie
  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }
}
