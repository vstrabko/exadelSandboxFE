import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorIntlRu extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  of = '';

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.of} ` + String(length);
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return String(startIndex + 1) + ' - ' + String(endIndex) + ` ${this.of} ` + String(length);
  };

  translateLabels(): void {
    this.itemsPerPageLabel = this.translateService.instant('candidateList.perPage');
    this.nextPageLabel = this.translateService.instant('candidateList.nextPage');
    this.previousPageLabel = this.translateService.instant('candidateList.prevPage');
    this.of = this.translateService.instant('candidateList.of');
    this.changes.next();
  }
}
