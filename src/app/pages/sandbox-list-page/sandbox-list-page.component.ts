import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Sandbox } from 'src/app/models/sandbox.model';
import { SandboxService } from '../../services/sandbox-service';

@Component({
  selector: 'app-sandbox-list-page',
  templateUrl: './sandbox-list-page.component.html',
  styleUrls: ['./sandbox-list-page.component.scss'],
})
export class SandboxListPageComponent implements OnInit {
  length = 500;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  sandbox: Sandbox;
  datasource: any[] = [];
  sandboxArr: any[] = [];

  constructor(private router: Router, private sandboxService: SandboxService) {}
  goCreateSandbox(): void {
    void this.router.navigateByUrl('/sandbox/create');
  }

  getCardSandbox(sandbox: Sandbox): void {
    this.sandbox = sandbox;
  }

  onPageChanged(e: PageEvent): void {
    const firstCut: number = e.pageIndex * e.pageSize;
    const secondCut: number = firstCut + e.pageSize;
    this.sandboxArr = this.datasource.slice(firstCut, secondCut);
  }
  ngOnInit(): void {
    this.sandboxService.get().subscribe((data: any) => {
      this.datasource = data;
      this.sandboxArr = this.datasource.slice(0, this.pageSize);
    });
  }
}
