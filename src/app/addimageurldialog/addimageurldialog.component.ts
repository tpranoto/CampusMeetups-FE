import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addimageurldialog',
  templateUrl: './addimageurldialog.component.html',
  styleUrl: './addimageurldialog.component.css',
})
export class AddimageurldialogComponent {
  imageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddimageurldialogComponent>,
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
