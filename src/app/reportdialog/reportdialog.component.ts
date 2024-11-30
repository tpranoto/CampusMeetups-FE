import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CmproxyService } from '../services/cmproxy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationdialogService } from '../services/notificationdialog.service';

@Component({
  selector: 'app-reportdialog',
  templateUrl: './reportdialog.component.html',
  styleUrl: './reportdialog.component.css',
})
export class ReportdialogComponent {
  public reason: string = '';
  public details: string = '';
  private reporterId: string = '';
  private reportedId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { reporterId: string; reportedId: string },
    public dialogRef: MatDialogRef<ReportdialogComponent>,
    private proxy$: CmproxyService,
    private notifServ: NotificationdialogService
  ) {
    this.reporterId = data.reporterId;
    this.reportedId = data.reportedId;
  }

  onReasonChange(event: any) {
    this.reason = event.target.value;
  }

  onDetailsChange(event: any) {
    this.details = event.target.value;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.proxy$
      .createNewReport(
        this.reason,
        this.details,
        this.reporterId,
        this.reportedId
      )
      .subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.notifServ.showNotificationDialog(
            'organizer reported successfully',
            'success'
          );
          this.dialogRef.close();
        }
      });
  }
}
