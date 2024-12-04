import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilecheckService {
  private profileCheck: BehaviorSubject<any>;
  public profileId$: Observable<any>;

  constructor(private cookieService: CookieService) {
    const profileId = this.cookieService.get('profile');
    this.profileCheck = new BehaviorSubject<any>(profileId);
    this.profileId$ = this.profileCheck.asObservable();
  }

  get profileId() {
    return this.profileCheck.value;
  }

  setProfile(profileId: any) {
    this.cookieService.set('profile', profileId);
    this.profileCheck.next(profileId);
  }

  clearProfile() {
    this.cookieService.delete('profile');
    this.profileCheck.next(null);
  }
}
