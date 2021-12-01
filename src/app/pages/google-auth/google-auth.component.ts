import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authResponse } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authServise: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): any {
    const parsedURL = new URLSearchParams(`${window.location.href}`);
    const code = parsedURL.get('code');
    if (code === null) {
      this.toastService.showError(
        this.translateService.instant('googleAuthTostr.text'),
        this.translateService.instant('googleAuthTostr.title'),
      );
      void this.router.navigate(['']);
    } else {
      return this.http
        .get<any>(
          `${environment.API_URL}/api/google/authorization/callback?code=${
            code ? code : ''
          }&state=test`,
        )
        .subscribe(
          (res: authResponse) => this.authServise.workWithToken(res),
          () => this.errorHandler(),
        );
    }
  }

  errorHandler(): void {
    this.toastService.showError(
      this.translateService.instant('googleAuthTostr.text'),
      this.translateService.instant('googleAuthTostr.title'),
    );
    void this.router.navigate(['']);
  }
}
