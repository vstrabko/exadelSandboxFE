import { OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ListSandboxes, Employee } from '../../interfaces/interfaces';
@Component({
  selector: 'app-create-sandbox-page',
  templateUrl: './create-sandbox-page.component.html',
  styleUrls: ['./create-sandbox-page.component.scss'],
})
export class CreateSandboxPageComponent implements OnInit {
  public sandboxes: ListSandboxes[] = [
    { id: 1, name: 'JS + .NET' },
    { id: 2, name: 'JS + Java' },
    { id: 3, name: 'DevOps' },
    { id: 4, name: 'QA' },
    { id: 5, name: 'JS + Java + QA' },
    { id: 6, name: 'DevOps' },
    { id: 7, name: 'BA' },
  ];

  public listRecruiters: Employee[] = [
    { id: 1, firstName: 'Ivan', lastName: 'Ivanov' },
    { id: 2, firstName: 'Ivan', lastName: 'Petrov' },
    { id: 3, firstName: 'Ivan', lastName: 'Sidorov' },
    { id: 4, firstName: 'Ivan', lastName: 'Popov' },
    { id: 5, firstName: 'Ivan', lastName: 'Sokolov' },
    { id: 6, firstName: 'Ivan', lastName: 'Smirnov' },
    { id: 7, firstName: 'Ivan', lastName: 'Kuznecov' },
  ];

  public listInterviewers: Employee[] = [
    { id: 1, firstName: 'Ivan', lastName: 'Lysenko', tech: 'JS' },
    { id: 2, firstName: 'Ivan', lastName: 'Malyshev', tech: 'JS' },
    { id: 3, firstName: 'Ivan', lastName: 'Alymova', tech: '.NET' },
    { id: 4, firstName: 'Ivan', lastName: 'Buynov', tech: '.NET' },
    { id: 5, firstName: 'Ivan', lastName: 'Raykin', tech: 'JS' },
    { id: 6, firstName: 'Ivan', lastName: 'Mayorov', tech: '.NET' },
    { id: 7, firstName: 'Ivan', lastName: 'Zaykov', tech: 'JS' },
  ];

  public listMentors: Employee[] = [
    { id: 1, firstName: 'Ivan', lastName: 'Lebedeva', tech: 'JS' },
    { id: 2, firstName: 'Ivan', lastName: 'Etkin', tech: '.NET' },
    { id: 3, firstName: 'Ivan', lastName: 'Yerin', tech: '.NET' },
    { id: 4, firstName: 'Ivan', lastName: 'Astafyev', tech: 'JS' },
    { id: 5, firstName: 'Ivan', lastName: 'Parfenov', tech: 'JS' },
    { id: 6, firstName: 'Ivan', lastName: 'Kiselyov', tech: 'JS' },
    { id: 7, firstName: 'Ivan', lastName: 'Belyaeva', tech: '.NET' },
  ];

  range = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });
  sandbox = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  recruiters = new FormControl('', [Validators.required]);
  interviewers = new FormControl('', [Validators.required]);
  mentors = new FormControl('', [Validators.required]);

  recr: string[] = [];
  int: string[] = [];
  ment: string[] = [];

  create(): void {
    console.log('create');
  }

  ngOnInit(): void {
    this.listRecruiters.map((el: Employee) => this.recr.push(`${el.firstName} ${el.lastName}`));
    this.listInterviewers.map((el: Employee) =>
      this.int.push(`${el.firstName} ${el.lastName} ${String(el.tech)}`),
    );
    this.listMentors.map((el: Employee) =>
      this.ment.push(`${el.firstName} ${el.lastName} ${String(el.tech)}`),
    );
  }
}
