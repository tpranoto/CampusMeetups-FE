import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistComponent } from './triplist/triplist.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'trip', component: TriplistComponent },
  { path: 'trip/:id', component: TripdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
