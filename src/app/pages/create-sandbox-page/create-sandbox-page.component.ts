import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import { Sandbox, Employee } from '../../interfaces/interfaces'
@Component({
  selector: 'app-create-sandbox-page',
  templateUrl: './create-sandbox-page.component.html',
  styleUrls: ['./create-sandbox-page.component.scss']
})
export class CreateSandboxPageComponent {
  public sandboxes: Sandbox[] = [
    { id: 1, name: 'JS + .NET' },
    { id: 2, name: 'JS + Java' },
    { id: 3, name: 'DevOps' },
    { id: 4, name: 'QA' },
    { id: 5, name: 'JS + Java + QA' },
    { id: 6, name: 'DevOps' },
    { id: 7, name: 'BA' },
  ];
  public recruters: Employee[] = [
    { id: 1, lastName: 'Ivanov' },
    { id: 2, lastName: 'Petrov' },
    { id: 3, lastName: 'Sidorov' },
    { id: 4, lastName: 'Popov' },
    { id: 5, lastName: 'Sokolov' },
    { id: 6, lastName: 'Smirnov' },
    { id: 7, lastName: 'Kuznecov' },
  ];

  public interviewers: Employee[] = [
    { id: 1, lastName: 'Lysenko' },
    { id: 2, lastName: 'Malyshev' },
    { id: 3, lastName: 'Alymova' },
    { id: 4, lastName: 'Buynov' },
    { id: 5, lastName: 'Raykin' },
    { id: 6, lastName: 'Mayorov' },
    { id: 7, lastName: 'Zaykov' },
  ];

  public mentors: Employee[] = [
    { id: 1, lastName: 'Lebedeva' },
    { id: 2, lastName: 'Etkin' },
    { id: 3, lastName: 'Yerin' },
    { id: 4, lastName: 'Astafyev' },
    { id: 5, lastName: 'Parfenov' },
    { id: 6, lastName: 'Kiselyov' },
    { id: 7, lastName: 'Belyaeva' },
  ];
    range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
    create():void{
      console.log('create')
    }
}
