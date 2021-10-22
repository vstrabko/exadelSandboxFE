import { User } from './models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  title = 'exadelsandbox';
  users$ = this.userService.get();
  userById = {};

  ngOnInit(): void {
    this.userService.getById(1).subscribe((user: User) => {
      this.userById = user;
    });
  }
}
