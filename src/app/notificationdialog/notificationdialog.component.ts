import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificationdialog',
  templateUrl: './notificationdialog.component.html',
  styleUrl: './notificationdialog.component.css',
})
export class NotificationdialogComponent {
  type: string = 'info';
  content: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: any; type: string }
  ) {
    this.content = data.data;
    if (data.type != null) {
      this.type = data.type;
    }
  }
}
