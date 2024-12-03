import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailspageComponent } from './tripdetailspage/tripdetailspage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { EditprofilepageComponent } from './editprofilepage/editprofilepage.component';
import { AboutComponent } from './about/about.component';
import { HelpPageComponent } from './help-page/help-page.component';

const routes: Routes = [
  { path: '', component: WelcomepageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'trip', component: TriplistpageComponent },
  { path: 'trip/:tripId', component: TripdetailspageComponent },
  { path: 'profile/:studentId', component: ProfilepageComponent },
  { path: 'profile/edit/:studentId', component: EditprofilepageComponent },
  { path: 'about', component: AboutComponent},
  { path: 'help', component: HelpPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
