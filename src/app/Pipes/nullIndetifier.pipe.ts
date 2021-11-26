import { Pipe, PipeTransform } from '@angular/core';
import { IdName } from '../models/id-name.model';

@Pipe({
  name: 'arrayHasNull',
})
export class IsObjectHaveNullValues implements PipeTransform {
  transform(value: IdName[] | undefined): IdName[] {
    return value && value.some((item: IdName | null) => item !== null) ? value : [];
  }
}
