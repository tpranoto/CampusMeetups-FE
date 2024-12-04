import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { TriplistpageComponent } from './triplistpage/triplistpage.component';
import { TripdetailspageComponent } from './tripdetailspage/tripdetailspage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { MyaccountpageComponent } from './myaccountpage/myaccountpage.component';

import { AvatarComponent } from './avatar/avatar.component';
import { RecttripcardComponent } from './recttripcard/recttripcard.component';
import { AttendeelistdialogComponent } from './attendeelistdialog/attendeelistdialog.component';
import { NotificationdialogComponent } from './notificationdialog/notificationdialog.component';
import { ReportdialogComponent } from './reportdialog/reportdialog.component';
import { CreatetripdialogComponent } from './createtripdialog/createtripdialog.component';
import { EdittripdialogComponent } from './edittripdialog/edittripdialog.component';
import { EdittripdeletedialogComponent } from './edittripdialog/edittripdeletedialog/edittripdeletedialog.component';
import { CarouselComponent } from './loginpage/carousel/carousel.component';
import { EditprofiledialogComponent } from './editprofiledialog/editprofiledialog.component';
import { AddimageurldialogComponent } from './addimageurldialog/addimageurldialog.component';
import { AboutdialogComponent } from './aboutdialog/aboutdialog.component';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { TnsdialogComponent } from './tnsdialog/tnsdialog.component';

import { CmproxyService } from './services/cmproxy.service';
import { UserService } from './services/user.service';
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
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    TriplistpageComponent,
    TripdetailspageComponent,
    ProfilepageComponent,
    LoginpageComponent,
    MyaccountpageComponent,
    AvatarComponent,
    RecttripcardComponent,
    AttendeelistdialogComponent,
    NotificationdialogComponent,
    CarouselComponent,
    ReportdialogComponent,
    CreatetripdialogComponent,
    EdittripdialogComponent,
    EdittripdeletedialogComponent,
    EditprofiledialogComponent,
    AddimageurldialogComponent,
    AboutdialogComponent,
    HelpdialogComponent,
    TnsdialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,
    FormsModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    CmproxyService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
