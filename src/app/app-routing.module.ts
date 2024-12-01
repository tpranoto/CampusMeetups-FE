import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailspageComponent } from './tripdetailspage/tripdetailspage.component';
import { CreatetrippageComponent } from './createtrippage/createtrippage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { EdittrippageComponent } from './edittrippage/edittrippage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { EditprofilepageComponent } from './editprofilepage/editprofilepage.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'trip/create', component: CreatetrippageComponent },
  { path: 'trip/edit/:tripId', component: EdittrippageComponent },
  { path: 'trip', component: TriplistpageComponent },
  { path: 'trip/:tripId', component: TripdetailspageComponent },
  { path: 'profile/:studentId', component: ProfilepageComponent },
  { path: 'profile/edit/:studentId', component: EditprofilepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
