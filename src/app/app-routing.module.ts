import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistComponent } from './triplist/triplist.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';
import { CreatetripComponent } from './createtrip/createtrip.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'trip', component: TriplistComponent },
  { path: 'trip/:id', component: TripdetailsComponent },
  { path: 'trip/create', component: CreatetripComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
