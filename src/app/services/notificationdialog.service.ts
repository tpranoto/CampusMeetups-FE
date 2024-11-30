import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationdialogComponent } from '../notificationdialog/notificationdialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationdialogService {
  constructor(private dialog: MatDialog) {}

  showNotificationDialog(
    content: string,
    type: string,
    timeout: number = 1000
  ): void {
    const dialogRef = this.dialog.open(NotificationdialogComponent, {
      data: {
        data: content,
        type: type,
      },
    });

    setTimeout(() => {
      dialogRef.close();
    }, timeout);
  }
}
