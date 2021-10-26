import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  constructor(private getData: UserService) {}
  showPopup: boolean;
  openCard(): void {
    this.showPopup = !this.showPopup;
  }
  users: any;
  ngOnInit(): void {
    this.getData.get().subscribe((data: any): void => {
      this.users = data;
    });
  }
}
