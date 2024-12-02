import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createtripimagedialog',
  templateUrl: './createtripimagedialog.component.html',
  styleUrl: './createtripimagedialog.component.css',
})
export class CreatetripimagedialogComponent {
  imageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreatetripimagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.currentImageUrl && data.currentImageUrl != '') {
      this.imageUrl = data.currentImageUrl;
    }
  }

  onSubmitClick(): void {
    this.dialogRef.close(this.imageUrl);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
