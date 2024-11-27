import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  constructor(private cookieService: CookieService) {
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
    this.cookieService.set('user', JSON.stringify(userData));
    this.userSubject.next(userData);
  }

  clearUser() {
    this.cookieService.delete('user');
    this.userSubject.next(null);
  }
}
