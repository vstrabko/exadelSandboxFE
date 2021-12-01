import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss'],
})
export class AdminMainPageComponent {
  showPopup: boolean;
  showAppointInterview: boolean;

  showPop(): void {
    this.showPopup = !this.showPopup;
  }
  closeCard(): void {
    this.showPopup = !this.showPopup;
  }

  toggleAppointInterview(): void {
    console.log('click');
    this.showAppointInterview = !this.showAppointInterview;
  }
}
