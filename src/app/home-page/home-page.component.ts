import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  values = [
    { id: 1, name: 'JS + .NET' },
    { id: 2, name: 'JS + Java' },
    { id: 3, name: 'DevOps' },
    { id: 4, name: 'QA' },
    { id: 5, name: 'JS + Java + QA' },
    { id: 6, name: 'DevOps' },
  ];
  // constructor() {}
  // ngOnInit() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
