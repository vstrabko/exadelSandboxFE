import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from 'src/app/services/candidate-service.service';
import { Candidate } from 'src/app/models/candidate.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CandidateContext } from 'src/app/services/candidateContext.service';
import { IdName } from 'src/app/models/id-name.model';
@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss'],
})
export class CandidateTableComponent implements OnInit {
  constructor(
    private candidateService: CandidateService,
    private candidateContext: CandidateContext,
  ) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'surname',
    'email',
    'status',
    'sandbox',
  ];
  dataSource: MatTableDataSource<Candidate>;
  selection = new SelectionModel<Candidate>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  labels = ['status', 'location', 'recruiter', 'sandbox'];
  statusValues: IdName[];
  sandboxValues: IdName[];
  mentorsValues: IdName[];
  candidates: Candidate[];
  candidate: Candidate;
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  togglePopup(row: Candidate): void {
    this.candidate = row;
    this.showModal.emit();
  }

  ngOnInit(): void {
    this.statusValues = this.candidateContext.getStatuses();
    this.sandboxValues = this.candidateContext.getSandbox();
    this.mentorsValues = this.candidateContext.getMentors();

    this.candidateService.get().subscribe((data: any) => {
      this.candidates = data;
      this.candidates.map((e: Candidate) => (e.position = this.candidates.indexOf(e) + 1));
      this.dataSource = new MatTableDataSource(this.candidates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.dataSource) {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.dataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Candidate): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      Number(row.position) + 1
    }`;
  }
}
