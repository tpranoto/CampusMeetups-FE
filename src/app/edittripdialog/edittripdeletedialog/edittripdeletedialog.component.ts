import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CmproxyService } from '../../services/cmproxy.service';
import { NotificationdialogService } from '../../services/notificationdialog.service';

@Component({
  selector: 'app-edittripdeletedialog',
  templateUrl: './edittripdeletedialog.component.html',
  styleUrl: './edittripdeletedialog.component.css',
})
export class EdittripdeletedialogComponent {
  tripId: string = '';
  tripName: string = '';

  constructor(
    public dialogRef: MatDialogRef<EdittripdeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tripId: string; tripName: string },
    private proxy$: CmproxyService,
    private notifServ: NotificationdialogService
  ) {
    this.tripId = data.tripId;
    this.tripName = data.tripName;
  }

  onSubmitClick(): void {
    this.proxy$.deleteTrip(this.tripId).subscribe((result: any) => {
      if (result.error) {
        this.notifServ.showNotificationDialog(result.error, 'fail');
      } else {
        this.dialogRef.close('ok');
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
