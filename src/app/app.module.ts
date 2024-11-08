import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistComponent } from './triplist/triplist.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';

import { CmproxyService } from './cmproxy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    TriplistComponent,
    TripdetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient(), CmproxyService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
