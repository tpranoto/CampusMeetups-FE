import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';
import { CreatetrippageComponent } from './createtrippage/createtrippage.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'trip/create', component: CreatetrippageComponent },
  { path: 'trip', component: TriplistpageComponent },
  { path: 'trip/:tripId', component: TripdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
