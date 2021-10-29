import { Component } from '@angular/core';
import { LocalizationService } from './internationalization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'exadelsandbox';
  constructor(private localizationService: LocalizationService) {
    this.localizationService.localStorage();
  }
}
