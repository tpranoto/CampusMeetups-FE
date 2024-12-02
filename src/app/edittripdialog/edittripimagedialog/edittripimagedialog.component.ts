import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edittripimagedialog',
  templateUrl: './edittripimagedialog.component.html',
  styleUrl: './edittripimagedialog.component.css',
})
export class EdittripimagedialogComponent {
  imageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<EdittripimagedialogComponent>,
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
