import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailspageComponent } from './tripdetailspage/tripdetailspage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'trip', component: TriplistpageComponent },
  { path: 'trip/:tripId', component: TripdetailspageComponent },
  { path: 'profile/:studentId', component: ProfilepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
