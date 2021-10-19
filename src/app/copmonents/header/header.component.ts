import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public title: string = 'Header';

  public role: string = 'admin';

  public userName: string = 'Mikhail';
}