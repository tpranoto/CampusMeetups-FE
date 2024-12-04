import { Component } from '@angular/core';
import { CmproxyService } from '../services/cmproxy.service';
import { TripsData, AttendedTrips, StudentDetails } from '../models/models';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportdialogComponent } from '../reportdialog/reportdialog.component';
import { UserService } from '../services/user.service';
import { EditprofiledialogComponent } from '../editprofiledialog/editprofiledialog.component';
import { ProfilecheckService } from '../services/profilecheck.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css',
})
export class ProfilepageComponent {
  studentId: string = '';
  userData: StudentDetails | any = {};
  organizedTrips: TripsData[] = [];
  joinedTrips: AttendedTrips[] = [];

  constructor(
    private proxy$: CmproxyService,
    private dialog: MatDialog,
    private notifServ: NotificationdialogService,
    private userServ: UserService,
    private profileServ: ProfilecheckService
  ) {
    this.trackUserSession();
  }

  ngOnInit(): void {
    this.profileServ.profileId$.subscribe((id) => {
      this.studentId = id;
      this.fetchStudentData(this.studentId);
    });
  }

  fetchStudentData(studentId: string): void {
    this.proxy$.getStudentDetailsById(studentId).subscribe((result: any) => {
      if (result.error) {
        this.notifServ.showNotificationDialog(result.error, 'fail');
      } else {
        this.userData = result;
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
