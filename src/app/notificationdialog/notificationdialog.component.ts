import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificationdialog',
  templateUrl: './notificationdialog.component.html',
  styleUrl: './notificationdialog.component.css',
})
export class NotificationdialogComponent {
  content: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: any }) {
    this.content = data.data;
  }
}
