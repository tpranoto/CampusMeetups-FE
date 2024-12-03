import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmproxyService } from '../services/cmproxy.service';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { CategoryDetails } from '../models/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddimageurldialogComponent } from '../addimageurldialog/addimageurldialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtripdialog',
  templateUrl: './createtripdialog.component.html',
  styleUrl: './createtripdialog.component.css',
})
export class CreatetripdialogComponent {
  tripForm: FormGroup;
  tripImage: string = '';
  trip: any = {};
  categories: CategoryDetails[] = [];
  currentStep: number = 1;
  today: string;

  constructor(
    public dialogRef: MatDialogRef<CreatetripdialogComponent>,
    private formBuilder: FormBuilder,
    private proxy$: CmproxyService,
    private notifServ: NotificationdialogService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.fetchCategories();

    this.tripForm = this.formBuilder.group({
      tripName: ['', Validators.required],
      startDate: ['', Validators.required],
      tripLoc: ['', Validators.required],
      tripCategory: [`{\"name\":\"Select Category\"}`, Validators.required],
      description: ['', Validators.required],
    });

    const date = new Date();
    this.today = this.formatDateForInput(date.toString());
  }

  nextStep(): void {
    if (this.currentStep < 2) {
      this.currentStep++;

      const tripData = this.tripForm.value;
      this.trip = {
        name: tripData.tripName,
        description: tripData.description,
        image: this.tripImage,
        location: tripData.tripLoc,
        timestamp: new Date(tripData.startDate),
        categoryId: JSON.parse(tripData.tripCategory).categoryId,
        categoryData: {
          name: JSON.parse(tripData.tripCategory).name,
        },
      };
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validForm(): boolean {
    return (
      this.tripForm.invalid ||
      this.tripForm.value.tripCategory === `{\"name\":\"Select Category\"}`
    );
  }

  categoryValue(category: any) {
    return JSON.stringify(category);
  }

  onImageRevertClick(): void {
    this.tripImage = '';
  }

  onImageEditClick(): void {
    const dialogRef = this.dialog.open(AddimageurldialogComponent, {
      width: '50vw',
      position: {
        top: '15vh',
      },
      data: { currentImageUrl: this.tripImage },
    });

    dialogRef.afterClosed().subscribe((newImageUrl: string) => {
      if (newImageUrl) {
        this.tripImage = newImageUrl;
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if (!this.validForm()) {
      this.proxy$.createTrip(this.trip).subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.router.navigate(['/trip', result.tripId]);

          this.dialogRef.close();
        }
      });
    }
  }

  fetchCategories(): void {
    this.proxy$.getCategories().subscribe((result: any) => {
      if (result.error) {
        this.notifServ.showNotificationDialog(result.error, 'fail');
      } else {
        this.categories = [{ name: 'Select Category' }, ...result];
      }
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
