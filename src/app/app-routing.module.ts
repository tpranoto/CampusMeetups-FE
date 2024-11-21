import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailspageComponent } from './tripdetailspage/tripdetailspage.component';
import { CreatetrippageComponent } from './createtrippage/createtrippage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { EdittrippageComponent } from './edittrippage/edittrippage.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'trip/create', component: CreatetrippageComponent },
  { path: 'trip/edit/:tripId', component: EdittrippageComponent },
  { path: 'trip', component: TriplistpageComponent },
  { path: 'trip/:tripId', component: TripdetailspageComponent },
  { path: 'profile/:studentId', component: ProfilepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
