import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  constructor(private userService: UserService) {}
  showPopup: boolean;
  candidate: User;
  //users: User[];

  length = 500;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  datasource: any[] = [];

  activePageDataChunk: any[] = [];

  getUser(user: User): void {
    this.candidate = user;
  }
  openCard(): void {
    this.showPopup = !this.showPopup;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str: string) => +str);
  }

  onPageChanged(e: any): void {
    const firstCut: number = e.pageIndex * e.pageSize;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const secondCut: number = firstCut + e.pageSize;
    this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
  }

  ngOnInit(): void {
    this.userService.get().subscribe((data: any) => {
      this.datasource = data;
      this.activePageDataChunk = this.datasource.slice(0, this.pageSize);
    });
  }
}
