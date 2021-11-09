import { Component, ViewChild, ElementRef, OnInit, AfterViewChecked, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-multiselect-search',
  templateUrl: './multiselect-search.component.html',
  styleUrls: ['./multiselect-search.component.scss'],
})
export class MultiselectSearchComponent implements OnInit, AfterViewChecked {
  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues: any[] = [];
  @Input() data: string[];
  @Input() placeholder: string;
  filteredOptions: Observable<any[]>;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    /**
     * Set filter event based on value changes
     */
    this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
      startWith<string>(''),
      map((name: any) => this._filter(name)),
    );
  }

  //Used to filter data based on search input
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    const filteredList = this.data.filter(
      (option: any) => option.toLowerCase().indexOf(filterValue) === 0,
    );
    return filteredList;
  }

  //Remove from selected values based on uncheck
  selectionChange(event: MatOptionSelectionChange): void {
    if (event.isUserInput && event.source.selected === false) {
      const index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1);
    }
  }

  openedChange(e: boolean): void {
    // Set search textbox value as empty while opening selectbox
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  /**
   * Clearing search textbox value
   */
  clearSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state
   */
  setSelectedValues(): void {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e: any) => {
        if (this.selectedValues.indexOf(e) === -1) {
          this.selectedValues.push(` ${String(e)}`);
        }
      });
    }
  }
}
