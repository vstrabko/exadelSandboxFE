import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SandboxService } from 'src/app/services/sandbox-service';
import { SelectionModel } from '@angular/cdk/collections';
import { Sandbox } from 'src/app/models/sandbox.model';
import { Router } from '@angular/router';
import { SandboxServiceFilter } from './../../../services/sandboxFilter-service';
import { SandboxDataSource } from './sandbox-data-source';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs/internal/observable/merge';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { SandboxExel } from 'src/app/models/sandboxExel.model';

@Component({
  selector: 'app-sandbox-list-page',
  templateUrl: './sandbox-list-page.component.html',
  styleUrls: ['./sandbox-list-page.component.scss'],
})
export class SandboxListPageComponent implements OnInit, AfterViewInit {
  totalRows = 0;
  constructor(
    private router: Router,
    private sandboxService: SandboxService,
    private roleUser: AuthService,
    private sandboxServiceFilter: SandboxServiceFilter,
  ) {}

  pageEvent: PageEvent;

  displayedColumns: string[] = ['select', 'startDate', 'name', 'description', 'status'];
  matDataSource: MatTableDataSource<Sandbox>;
  dataSource: SandboxDataSource;
  selection = new SelectionModel<Sandbox>(true, []);

  public role: string[] = this.roleUser.userRole();
  public isAdmin = this.role.includes('Admin' || 'Manager');

  queryParams = {
    params: {
      PageNumber: 1,
      PageSize: 5,
      SortingType: 0,
      SearchingStringAll: ',',
      SortField: 'status',
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  sandBoxes: Sandbox[];
  sandbox: Sandbox;
  sandBoxesExel: SandboxExel[];

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
      this.sandBoxesExel = data;

      for (let i = 0; i < this.sandBoxesExel.length; i++) {
        delete this.sandBoxesExel[i].id;
        delete this.sandBoxesExel[i].endDate;
        delete this.sandBoxesExel[i].startRegistration;
        delete this.sandBoxesExel[i].endRegistration;
      }

      this.matDataSource = new MatTableDataSource(this.sandBoxes);
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
    });
    this.dataSource = new SandboxDataSource(this.sandboxServiceFilter);
    this.dataSource.sandboxSubject.subscribe((data: Sandbox[]) => (this.sandBoxes = data));
    this.dataSource.loadSandboxes(this.queryParams);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSandboxesPage();
          this.sandboxService.get().subscribe((data: Sandbox[]) => {
            this.sandBoxes = data;
          });
        }),
      )
      .subscribe();

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
    if (this.sort.active) {
      this.queryParams.params.SortField = this.sort.active;
    }
    if (this.sort.direction === 'asc') {
      this.queryParams.params.SortingType = 0;
    } else if (this.sort.direction === 'desc') {
      this.queryParams.params.SortingType = 1;
    }
    this.dataSource.loadSandboxes(this.queryParams);
    this.role = this.roleUser.userRole();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue === '') {
      this.queryParams.params.SearchingStringAll = ',';
    } else {
      this.queryParams.params.SearchingStringAll = filterValue;
    }
    if (this.matDataSource.paginator) {
      this.matDataSource.paginator.firstPage();
    }
    this.dataSource.loadSandboxes(this.queryParams);
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

  downloadExel(): void {
    const ws_name = 'SomeSheet';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.sandBoxesExel);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s: any): ArrayBuffer {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'exportedSandboxList.xlsx',
    );
  }
}
