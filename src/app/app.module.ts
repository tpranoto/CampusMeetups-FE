import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';
import { CreatetrippageComponent } from './createtrippage/createtrippage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';

import { AvatarComponent } from './avatar/avatar.component';
import { RecttripcardComponent } from './recttripcard/recttripcard.component';

import { CmproxyService } from './cmproxy.service';
import { CookiesService } from './cookie.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    TriplistpageComponent,
    TripdetailsComponent,
    CreatetrippageComponent,
    ProfilepageComponent,
    AvatarComponent,
    RecttripcardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    CmproxyService,
    provideAnimationsAsync(),
    CookiesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
