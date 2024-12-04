import { Component } from '@angular/core';
import { CmproxyService } from '../services/cmproxy.service';
import { TripsData, AttendedTrips, StudentDetails } from '../models/models';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportdialogComponent } from '../reportdialog/reportdialog.component';
import { UserService } from '../services/user.service';
import { EditprofiledialogComponent } from '../editprofiledialog/editprofiledialog.component';

@Component({
  selector: 'app-myaccountpage',
  templateUrl: './myaccountpage.component.html',
  styleUrl: './myaccountpage.component.css',
})
export class MyaccountpageComponent {
  userData: StudentDetails | any = {};
  organizedTrips: TripsData[] = [];
  joinedTrips: AttendedTrips[] = [];

  constructor(
    private proxy$: CmproxyService,
    private dialog: MatDialog,
    private notifServ: NotificationdialogService,
    private userServ: UserService
  ) {
    this.trackUserSession();
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    this.proxy$.getSessionUserInfo().subscribe((result: any) => {
      if (result.error) {
        this.notifServ.showNotificationDialog(result.error, 'fail');
      } else {
        this.userData = result.user;
        this.userServ.setUser(result.user);
        this.fetchOrganizedTrips(result.user.studentId);
        this.fetchJoinedTrips(result.user.studentId);
      }
    });
  }

  fetchJoinedTrips(studentId: string): void {
    this.proxy$
      .getAttendedTripsForStudent(studentId)
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.joinedTrips = result;
        }
      });
  }

  fetchOrganizedTrips(studentId: string): void {
    this.proxy$
      .getTripsOrganizedByStudent(studentId)
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.organizedTrips = result;
        }
      });
  }

  onReportUserClick() {
    const dialogRef = this.dialog.open(ReportdialogComponent, {
      width: '50vw',
      data: { reportedId: this.userData.studentId },
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'def_profile.jpg';
  }

  onEditProfileClick() {
    const dialogRef = this.dialog.open(EditprofiledialogComponent, {
      width: '50vw',
      data: { profile: this.userData },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.userData = result;
    });
  }

  trackUserSession(): void {
    this.userServ.trackUser((user: any) => {});
  }
}
