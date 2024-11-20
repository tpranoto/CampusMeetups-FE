import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-attendeelistdialog',
  templateUrl: './attendeelistdialog.component.html',
  styleUrl: './attendeelistdialog.component.css',
})
export class AttendeelistdialogComponent {
  attendees: any = [];
  constructor(
    private dialogRef: MatDialogRef<AttendeelistdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    this.attendees = data.data;
  }

  onProfileClick(): void {
    this.dialogRef.close();
  }
}
