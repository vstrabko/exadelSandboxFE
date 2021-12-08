import { Employee } from './../../../interfaces/interfaces';
import { CandidateContextService } from 'src/app/services/candidate-context.service';
import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from 'src/app/services/candidate-service.service';
import { Candidate } from 'src/app/models/candidate.model';
import { SelectionModel } from '@angular/cdk/collections';
import { IdName } from 'src/app/models/id-name.model';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs/internal/observable/merge';
import { CandidateServiceFilter } from 'src/app/services/candidate-filter.service';
import { CandidateDataSource } from './candidate-data-source';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CandidateSandboxes } from './../../../interfaces/interfaces';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss'],
})
export class CandidateTableComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private candidateService: CandidateService,
    private candidateContext: CandidateContextService,
    private candidateServiceFilter: CandidateServiceFilter,
    private http: HttpClient,
    private toast: ToastService,
    private translateService: TranslateService,
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'status',
    'sandbox',
    'location',
    'recruiter',
  ];
  matDataSource: MatTableDataSource<Candidate>;
  dataSource: CandidateDataSource;
  selection = new SelectionModel<Candidate>(true, []);
  locations = new FormControl();
  isAppointInterviewDisabled = true;
  selectedCandidate: Candidate;
  public candidateRequestForm: FormGroup;

  queryParams = {
    headers: {
      Locations: [],
      Mentors: [],
      Sandboxes: [],
      Statuses: [],
    },
    params: {
      PageNumber: 1,
      PageSize: 5,
      SortingType: 0,
      SortField: 'id',
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private title: string = '';
  private text: string = '';
  private titleEr: string = '';
  private textEr: string = '';

  public statusValues: IdName[];
  public locationsValues: any;
  public sandboxValues: IdName[];
  public recruitersValues: Employee[];
  public candidates: Candidate[];
  public candidate: Candidate;
  public isStatusDraft: boolean = true;
  public isCandidateProcessId: boolean = true;
  public recruterId: string | null = this.userService.user ? this.userService.user._id : '';
  public userRole: string;
  public candidatesId: string[] = [];
  public candidatesProcessId: string[] = [];
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAppointInterview: EventEmitter<boolean> = new EventEmitter<boolean>();

  togglePopup(row: Candidate): void {
    this.candidate = row;
    this.showModal.emit();
  }

  toggleAppoinInterview(): void {
    this.showAppointInterview.emit();
  }

  addFiltredCandidates(): void {
    this.candidatesId = this.selection.selected.map((candidate: Candidate) => {
      return candidate.candidateSandboxes
        .filter((sand: CandidateSandboxes) => {
          return (
            sand.candidateProcesses[sand.candidateProcesses.length - 2].status.name === 'Draft' &&
            (sand.sandbox.status === 'Application' || sand.sandbox.status === 'Registration')
          );
        })
        .map((filtred: CandidateSandboxes) => filtred.id)
        .join('');
    });
    if (
      this.candidatesId.length &&
      !this.candidatesId.some((item: string) => item.length < 1) &&
      this.recruterId !== undefined
    ) {
      this.isStatusDraft = false;
    } else {
      this.isStatusDraft = true;
    }
    this.candidatesProcessId = this.selection.selected.map(
      (candidate: Candidate) =>
        candidate.candidateSandboxes[0].candidateProcesses[
          candidate.candidateSandboxes[0].candidateProcesses.length - 2
        ].id,
    );
    if (this.candidatesProcessId.length) {
      this.isCandidateProcessId = false;
    } else {
      this.isCandidateProcessId = true;
    }
  }

  appointCandidateToRecruiter(): void {
    if (this.recruterId !== null) {
      this.http
        .post(
          `${String(environment.API_URL)}/api/recruiters/${this.recruterId}/candidates`,
          this.candidatesId,
        )
        .subscribe(
          () => this.toast.showSuccess(this.title, this.text),
          () => this.toast.showError(this.titleEr, this.textEr),
        );
    }
  }

  ngOnInit(): void {
    this.userRole = this.userService.user ? this.userService.user._roles[0] : '';
    this.statusValues = this.candidateContext.getStatuses()[0];
    this.sandboxValues = this.candidateContext.getSandbox()[0];
    this.recruitersValues = this.candidateContext.getRecruiters()[0];
    this.locationsValues = this.candidateContext.getLocation()[0];
    this.candidateRequestForm = new FormGroup({
      locationsId: new FormControl(''),
      sandmoxId: new FormControl(''),
      recruitersId: new FormControl(''),
      statusesId: new FormControl(''),
    });

    this.candidateService.get().subscribe((data: any) => {
      this.candidates = data;
      this.matDataSource = new MatTableDataSource(this.candidates);
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
    });

    this.dataSource = new CandidateDataSource(this.candidateServiceFilter);
    this.dataSource.loadCandidates(this.queryParams);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.loadCandidatesPage())).subscribe();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCandidatesPage()))
      .subscribe();
  }

  loadCandidatesPage(): void {
    this.queryParams.params.PageSize = this.paginator.pageSize;
    this.queryParams.params.PageNumber = this.paginator.pageIndex + 1;
    if (this.sort.active) {
      this.queryParams.params.SortField = this.sort.active;
    }
    if (this.sort.direction === 'asc') {
      this.queryParams.params.SortingType = 0;
    } else if (this.sort.direction === 'desc') {
      this.queryParams.params.SortingType = 1;
    }
    if (this.candidateRequestForm.value.locationsId) {
      this.queryParams.headers.Locations = this.candidateRequestForm.value.locationsId;
    }
    if (this.candidateRequestForm.value.mentorsId) {
      this.queryParams.headers.Mentors = this.candidateRequestForm.value.mentorsId;
    }
    if (this.candidateRequestForm.value.sandmoxId) {
      this.queryParams.headers.Sandboxes = this.candidateRequestForm.value.sandmoxId;
    }
    if (this.candidateRequestForm.value.statusesId) {
      this.queryParams.headers.Statuses = this.candidateRequestForm.value.statusesId;
    }
    this.dataSource.loadCandidates(this.queryParams);
  }

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
    this.loadCandidatesPage();
    this.paginator.firstPage();
    console.log(this.selection.selected[0]);
  }

  sendEmail(): any {
    this.http
      .post(
        `${String(environment.API_URL)}/api/candidates/send-test-task`,
        this.candidatesProcessId,
      )
      .subscribe(
        () => this.toast.showSuccess(this.title, this.text),
        () => this.toast.showError(this.titleEr, this.textEr),
      );
  }

  checkSelected(): void {
    if (
      this.selection.selected.length === 1 &&
      this.selection.selected[0].candidateSandboxes[0].candidateProcesses[0].status.name ===
        'Interview'
    ) {
      this.isAppointInterviewDisabled = false;
      this.selectedCandidate = this.selection.selected[0];
    } else {
      this.isAppointInterviewDisabled = true;
    }
  }

  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
    this.titleEr = this.translateService.instant('tostr.titleEr');
    this.textEr = this.translateService.instant('tostr.textEr');
  }
}
