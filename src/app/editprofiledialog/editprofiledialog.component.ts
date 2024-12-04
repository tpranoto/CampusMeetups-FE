import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmproxyService } from '../services/cmproxy.service';
import { NotificationdialogService } from '../services/notificationdialog.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddimageurldialogComponent } from '../addimageurldialog/addimageurldialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editprofiledialog',
  templateUrl: './editprofiledialog.component.html',
  styleUrl: './editprofiledialog.component.css',
})
export class EditprofiledialogComponent {
  profileForm: FormGroup;
  profileImage: string = '';
  profile: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditprofiledialogComponent>,
    private formBuilder: FormBuilder,
    private proxy$: CmproxyService,
    private notifServ: NotificationdialogService,
    private dialog: MatDialog,
    private router: Router,
    private userServ: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { profile: any }
  ) {
    this.profile = data.profile;
    this.profileImage = data.profile.image;

    this.profileForm = this.formBuilder.group({
      fName: [data.profile.fname, Validators.required],
      lName: [data.profile.lname, Validators.required],
      phoneNumber: [data.profile.phoneNumber, Validators.required],
      bio: [data.profile.bio, Validators.required],
    });
  }

  validForm(): boolean {
    return this.profileForm.invalid;
  }

  onImageRevertClick(): void {
    this.profileImage = '';
  }

  onImageEditClick(): void {
    const dialogRef = this.dialog.open(AddimageurldialogComponent, {
      width: '50vw',
      position: {
        top: '20vh',
      },
      data: { currentImageUrl: this.profileImage },
    });

    dialogRef.afterClosed().subscribe((newImageUrl: string) => {
      if (newImageUrl) {
        this.profileImage = newImageUrl;
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    const profileFormData = this.profileForm.value;
    this.profile = {
      studentId: this.profile.studentId,
      fname: profileFormData.fName,
      lname: profileFormData.lName,
      phoneNumber: profileFormData.phoneNumber,
      image: this.profileImage,
      bio: profileFormData.bio,
    };

    if (this.validForm()) {
      this.proxy$.updateProfile(this.profile).subscribe((result: any) => {
        if (result.error) {
          this.notifServ.showNotificationDialog(result.error, 'fail');
        } else {
          this.userServ.setUser(result);
          this.dialogRef.close(result);
        }
      });
    }
  }

  formatPhoneNumber(event: any): void {
    let phone = event.target.value.replace(/\D/g, '');

    if (phone.length > 3 && phone.length <= 6) {
      phone = `(${phone.slice(0, 3)})${phone.slice(3, 6)}`;
    } else if (phone.length > 6) {
      phone = `(${phone.slice(0, 3)})${phone.slice(3, 6)}-${phone.slice(
        6,
        10
      )}`;
    }

    event.target.value = phone;
  }
}
