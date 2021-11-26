import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { authResponse } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {


  constructor(private http: HttpClient, private authServise: AuthService) { }

  ngOnInit(): Subscription {
    let parsedURL = new URLSearchParams(`${window.location.href}`);
    return this.http
      .get<any>(`${environment.API_URL}/api/google/authorization/callback?code=${parsedURL.get('code')}&state=test`)
      .subscribe(res => this.authServise.workWithToken(res))
  }

}
