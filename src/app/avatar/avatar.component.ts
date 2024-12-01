import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  @Input() size = 'small';
  @Input() imgUrl = '';
  @Input() fName = '';
  @Input() lName = '';

  shouldShowAvatarImage(): boolean {
    return this.imgUrl != null && this.imgUrl != '';
  }

  getInitials() {
    if (this.fName == '' || this.lName == '') {
      return '';
    }
    return this.fName[0].toUpperCase() + this.lName[0].toUpperCase();
  }
}
