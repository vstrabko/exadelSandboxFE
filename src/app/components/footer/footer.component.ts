import { Component } from '@angular/core';
import { LocalizationService } from 'src/app/internationalization/localization.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private localizationService: LocalizationService) {}

  ruLang = () => {
    if (localStorage.getItem('language')) {
      localStorage.removeItem('language');
      localStorage.setItem('language', 'ru');
      console.log('ru');
      this.localizationService.initService();
    }
  };

  enLang = () => {
    if (localStorage.getItem('language')) {
      localStorage.removeItem('language');
      localStorage.setItem('language', 'en');
      console.log('en');
      this.localizationService.initService();
    }
  };
}
