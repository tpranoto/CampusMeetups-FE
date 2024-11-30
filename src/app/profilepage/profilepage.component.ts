import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CmproxyService } from '../services/cmproxy.service';
import { TripsData, AttendedTrips, StudentDetails } from '../models/models';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportdialogComponent } from '../reportdialog/reportdialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css',
})
export class ProfilepageComponent {
  userData: StudentDetails | any = {};
  organizedTrips: TripsData[] = [];
  joinedTrips: AttendedTrips[] = [];
  isMyAccount: Boolean = false;

  constructor(
    private proxy$: CmproxyService,
    private actRouter: ActivatedRoute,
    private dialog: MatDialog,
    private notifServ: NotificationdialogService,
    private userServ: UserService
  ) {
    const studentId = actRouter.snapshot.params['studentId'];
    const userSessionData = this.userServ.user;
    this.isMyAccount = userSessionData.studentId === studentId;
    this.fetchStudentData(studentId);
  }

  fetchStudentData(studentId: string): void {
    this.proxy$.getStudentDetailsById(studentId).subscribe((result: any) => {
      if (result.error) {
        this.notifServ.showNotificationDialog(result.error, 'fail');
      } else {
        this.userData = result;
        if (this.userData.image == '') {
          this.userData.image = 'def_profile.jpg';
        }
        this.fetchOrganizedTrips(studentId);
        this.fetchJoinedTrips(studentId);
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
}
