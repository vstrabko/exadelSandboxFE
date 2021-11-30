import { Component, ViewChild, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SandboxService } from 'src/app/services/sandbox-service';
import { SelectionModel } from '@angular/cdk/collections';
import { Sandbox } from 'src/app/models/sandbox.model';
import { Router } from '@angular/router';
import { SandboxServiceFilter } from './../../../services/sandboxFilter-service';
import { SandboxDataSource } from './sandbox-data-source';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs/internal/observable/merge';

@Component({
  selector: 'app-sandbox-list-page',
  templateUrl: './sandbox-list-page.component.html',
  styleUrls: ['./sandbox-list-page.component.scss'],
})
export class SandboxListPageComponent implements OnInit, AfterViewInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private router: Router,
    private sandboxService: SandboxService,
    private sandboxServiceFilter: SandboxServiceFilter,
  ) {}
  pageEvent: PageEvent;
  displayedColumns: string[] = ['select', 'startDate', 'name', 'description', 'status'];
  matDataSource: MatTableDataSource<Sandbox>;
  dataSource: SandboxDataSource;
  selection = new SelectionModel<Sandbox>(true, []);

  queryParams = {
    params: {
      PageNumber: 1,
      PageSize: 5,
      SortingType: 0,
      SortField: '1',
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sandBoxes: Sandbox[];
  sandbox: Sandbox;

  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  goCreateSandbox(): void {
    void this.router.navigateByUrl('/sandbox/create');
  }

  togglePopup(row: Sandbox): void {
    this.sandbox = row;
    this.showModal.emit();
  }

  ngOnInit(): void {
    this.sandboxService.get().subscribe((data: Sandbox[]) => {
      this.sandBoxes = data;
      this.matDataSource = new MatTableDataSource(this.sandBoxes);
      this.dataSource = new SandboxDataSource(this.sandboxServiceFilter);
      this.dataSource.loadSandboxes(this.queryParams);
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.loadSandboxesPage())).subscribe((data: unknown) => {
      console.log('data pagin', data);
    });
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadSandboxesPage()))
      .subscribe((data: unknown) => {
        console.log('data sort', data);
      });
  }

  loadSandboxesPage(): void {
    this.queryParams.params.PageSize = this.paginator.pageSize;
    this.queryParams.params.PageNumber = this.paginator.pageIndex + 1;
    this.queryParams.params.SortField = this.sort.active;
    if (this.sort.direction === 'asc') {
      this.queryParams.params.SortingType = 0;
    } else if (this.sort.direction === 'desc') {
      this.queryParams.params.SortingType = 1;
    }

    this.dataSource.loadSandboxes(this.queryParams);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matDataSource.paginator) {
      this.matDataSource.paginator.firstPage();
    }
  }

  isAllSelected(): boolean {
    if (this.matDataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.matDataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  masterToggle(): void {
    if (this.matDataSource) {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.matDataSource.data);
    }
  }

  checkboxLabel(row?: Sandbox): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row.id + 1}`;
  }
}
