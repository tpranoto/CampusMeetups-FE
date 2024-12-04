import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmproxyService } from '../services/cmproxy.service';
import { NotificationdialogService } from '../services/notificationdialog.service';
import { CategoryDetails } from '../models/models';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddimageurldialogComponent } from '../addimageurldialog/addimageurldialog.component';
import { Router } from '@angular/router';
import { EdittripdeletedialogComponent } from './edittripdeletedialog/edittripdeletedialog.component';

@Component({
  selector: 'app-edittripdialog',
  templateUrl: './edittripdialog.component.html',
  styleUrl: './edittripdialog.component.css',
})
export class EdittripdialogComponent {
  tripForm: FormGroup;
  tripImage: string = '';
  trip: any = {};
  categories: CategoryDetails[] = [];
  currentStep: number = 1;
  today: string;

  constructor(
    public dialogRef: MatDialogRef<EdittripdialogComponent>,
    private formBuilder: FormBuilder,
    private proxy$: CmproxyService,
    private notifServ: NotificationdialogService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { trip: any }
  ) {
    this.fetchCategories();
    this.trip = data.trip;
    this.tripImage = data.trip.image;

    this.tripForm = this.formBuilder.group({
      tripName: [data.trip.name, Validators.required],
      startDate: [
        this.formatDateForInput(data.trip.timestamp),
        Validators.required,
      ],
      tripLoc: [data.trip.location, Validators.required],
      tripCategory: [
        JSON.stringify({
          categoryId: data.trip.categoryId,
          name: data.trip.categoryData.name,
        }),
        Validators.required,
      ],
      description: [data.trip.description, Validators.required],
      tripStatus: [data.trip.status, Validators.required],
    });

    const date = new Date();
    this.today = this.formatDateForInput(date.toString());
  }

  nextStep(): void {
    if (this.currentStep < 2) {
      this.currentStep++;

      const tripData = this.tripForm.value;
      this.trip = {
        tripId: this.trip.tripId,
        name: tripData.tripName,
        description: tripData.description,
        image: this.tripImage,
        status: tripData.tripStatus,
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
      !this.tripForm.invalid &&
      this.tripForm.value.tripCategory !== `{\"name\":\"Select Category\"}`
    );
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
    if (this.validForm()) {
      this.proxy$.updateTripDetails(this.trip).subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.router.navigate(['/trip', result.tripId]);

          this.dialogRef.close(result);
        }
      });
    }
  }

  onDeleteTripClick(): void {
    const dialogRef = this.dialog.open(EdittripdeletedialogComponent, {
      width: '50vw',
      position: {
        top: '15vh',
      },
      data: {
        tripId: this.trip.tripId,
        tripName: this.trip.name,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigate(['/']);
        this.dialogRef.close();
      }
    });
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
}
