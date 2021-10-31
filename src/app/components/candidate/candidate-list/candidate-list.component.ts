import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service.service';
import { Candidate } from 'src/app/models/candidate.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  constructor(private candidateService: CandidateService) {}
  showPopup: boolean;
  candidate: Candidate;
  //users: User[];

  length = 500;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  datasource: any[] = [];

  activePageDataChunk: any[] = [];
  users: Candidate[];

  getUser(user: Candidate): void {
    this.candidate = user;
  }
  closeCard(): void {
    this.showPopup = !this.showPopup;
  }
  showPop(e: any): void {
    if (e.target.classList.contains('content-wrapper')) {
      this.showPopup = !this.showPopup;
    }
  }

  onPageChanged(e: PageEvent): void {
    const firstCut: number = e.pageIndex * e.pageSize;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const secondCut: number = firstCut + e.pageSize;
    this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
  }
  ngOnInit(): void {
    this.candidateService.get().subscribe((data: any) => {
      this.datasource = data;
      this.activePageDataChunk = this.datasource.slice(0, this.pageSize);
    });
  }
}
