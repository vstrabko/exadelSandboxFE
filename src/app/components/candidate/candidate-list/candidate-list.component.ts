import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  constructor(private getData: UserService) {}
  showPopup: boolean;
  candidate:User;
  users: User[];

  getUser(user: User): void {
    this.candidate = user;
  }
  openCard(): void {
    this.showPopup = !this.showPopup;
  }

  ngOnInit(): void {
    this.getData.get().subscribe((data: any): void => {
      this.users = data;
    });
  }
}
