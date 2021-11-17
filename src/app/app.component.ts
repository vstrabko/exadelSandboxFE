import { Component } from '@angular/core';
import { LocalizationService } from './internationalization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'exadelsandbox';
  comingTimeArr = [
    {
      startTime: '02:00',
      endTime: '03:00',
      id: 0,
    },
    {
      startTime: '01:00',
      endTime: '02:00',
      id: 1,
    },
    {
      startTime: '04:00',
      endTime: '05:00',
      id: 2,
    },
    {
      startTime: '06:00',
      endTime: '07:00',
      id: 3,
    },
  ];

  constructor(private localizationService: LocalizationService) {
    this.localizationService.localStorage();
  }
}
