import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SandboxService } from 'src/app/services/sandbox-service';
import { SelectionModel } from '@angular/cdk/collections';
import { Sandbox } from 'src/app/models/sandbox.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sandbox-list-page',
  templateUrl: './sandbox-list-page.component.html',
  styleUrls: ['./sandbox-list-page.component.scss'],
})
export class SandboxListPageComponent implements OnInit {
  constructor(
    private router: Router,
    private sandboxService: SandboxService,
    private roleUser: AuthService,
  ) {}

  displayedColumns: string[] = ['select', 'startDate', 'name', 'description', 'status'];
  dataSource: MatTableDataSource<Sandbox>;
  selection = new SelectionModel<Sandbox>(true, []);
  public role: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sandBoxes: Sandbox[];
  candidate: any;
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  goCreateSandbox(): void {
    void this.router.navigateByUrl('/sandbox/create');
  }

  togglePopup(row: number): void {
    this.candidate = row;
    this.showModal.emit();
  }

  ngOnInit(): void {
    this.sandboxService.get().subscribe((data: any) => {
      this.sandBoxes = data;
      this.dataSource = new MatTableDataSource(this.sandBoxes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.role = this.roleUser.userRole();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
  checkboxLabel(row?: Sandbox): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row.id + 1}`;
  }
}
