import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from './internationalization/localization.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'exadelsandbox';

  constructor(
    private localizationService: LocalizationService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.localizationService.localStorage();
  }
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.authService.refreshToken();
      const token = {
        accessToken: this.getLSItem('accessToken'),
        refreshToken: this.getLSItem('refreshToken'),
      };
      this.authService.workWithToken(token);
      void this.router.navigate(['/candidates']);
    }
  }
  private getLSItem(key: string): string {
    const item = localStorage.getItem(key);
    return item ? item : '';
  }
}
