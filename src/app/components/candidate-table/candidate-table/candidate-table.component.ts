import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from 'src/app/services/candidate-service.service';
import { Candidate } from 'src/app/models/candidate.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CandidateContext } from 'src/app/services/candidateContext.service';
import { IdName } from 'src/app/models/id-name.model';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs/internal/observable/merge';
import { CandidateServiceFilter } from 'src/app/services/candidate-filter.service';
import { CandidateDataSource } from './candidate-data-source';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss'],
})
export class CandidateTableComponent implements OnInit, AfterViewInit {
  constructor(
    private candidateService: CandidateService,
    private candidateContext: CandidateContext,
    private candidateServiceFilter: CandidateServiceFilter,
  ) {}
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'status',
    'sandbox',
    'location',
  ];
  matDataSource: MatTableDataSource<Candidate>;
  dataSource: CandidateDataSource;
  selection = new SelectionModel<Candidate>(true, []);
  locations = new FormControl();
  public candidateRequestForm: FormGroup;

  queryParams = {
    headers: {
      Locations: ['01c71e88-a4f4-494e-9245-bebf5628efa6', 'd62bfdd0-7cdd-4912-b3d6-e600aea749cf'],
    },
    params: {
      PageNumber: 1,
      PageSize: 1,
      SortingType: 0,
      SortField: 'id',
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  statusValues: IdName[];
  locationsValues: any;
  sandboxValues: IdName[];
  mentorsValues: IdName[];
  candidates: Candidate[];
  candidate: Candidate;
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAppointInterview: EventEmitter<boolean> = new EventEmitter<boolean>();

  togglePopup(row: Candidate): void {
    this.candidate = row;
    this.showModal.emit();
  }

  toggleAppoinInterview(): void {
    this.showAppointInterview.emit();
  }

  ngOnInit(): void {
    this.statusValues = this.candidateContext.getStatuses();
    this.sandboxValues = this.candidateContext.getSandbox();
    this.mentorsValues = this.candidateContext.getMentors();
    this.locationsValues = this.candidateContext.getLocations();
    console.log(this.locationsValues);
    this.candidateRequestForm = new FormGroup({
      locationsId: new FormControl(''),
    });

    this.candidateService.get().subscribe((data: any) => {
      console.log(data);
      this.candidates = data;
      this.matDataSource = new MatTableDataSource(this.candidates);
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
      this.dataSource = new CandidateDataSource(this.candidateServiceFilter);
      this.dataSource.loadCandidates(this.queryParams);
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.loadCandidatesPage())).subscribe((data: unknown) => {
      console.log('data pagin', data);
      console.log('selected locations', this.locations.value);
    });
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCandidatesPage()))
      .subscribe((data: unknown) => {
        console.log('data sort', data);
      });
  }

  loadCandidatesPage(): void {
    this.queryParams.params.PageSize = this.paginator.pageSize;
    this.queryParams.params.PageNumber = this.paginator.pageIndex + 1;
    this.queryParams.params.SortField = this.sort.active;
    if (this.sort.direction === 'asc') {
      this.queryParams.params.SortingType = 0;
    } else if (this.sort.direction === 'desc') {
      this.queryParams.params.SortingType = 1;
    }

    this.dataSource.loadCandidates(this.queryParams);
  }

  // TODO: decide do we need such filter as we have filtering by sending request?

  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(filterValue);
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    if (this.matDataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.matDataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.matDataSource) {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.matDataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Candidate): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id)}`;
  }

  submit(): void {
    console.log(this.candidateRequestForm.value);
  }

  // selectLocation(event: any): void {
  //   console.log(event);
  //   console.log(this.selectLocation);
  // }
}
