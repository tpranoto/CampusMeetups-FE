import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmproxyService } from './cmproxy.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  constructor(
    private cookieService: CookieService,
    private proxy$: CmproxyService,
    private router: Router
  ) {
    const user = this.cookieService.get('user')
      ? JSON.parse(this.cookieService.get('user'))
      : null;
    this.userSubject = new BehaviorSubject<any>(user);
    this.user$ = this.userSubject.asObservable();
  }

  get user() {
    return this.userSubject.value;
  }

  setUser(userData: any) {
    var limitedUserData = {
      studentId: userData.studentId,
      fname: userData.fname,
      lname: userData.lname,
      image: userData.image,
    };

    this.cookieService.set('user', JSON.stringify(limitedUserData));
    this.userSubject.next(limitedUserData);
  }

  clearUser() {
    this.cookieService.delete('user');
    this.userSubject.next(null);
  }

  trackUser(callback: (user: any) => void): void {
    this.proxy$.getSessionUserInfo().subscribe((result: any) => {
      if (result.error) {
        this.router.navigate(['/login']);
      } else {
        this.user$.subscribe((user) => {
          if (this.user == null) {
            this.router.navigate(['/login']);
          } else {
            callback(user);
          }
        });
      }
    });
  }
}
