import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DateRangeFilterValue,
  FilterType,
  Record,
  RecordFilter
} from './models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  records$: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);

  constructor() {}

  public fetchFilteredRecords(activeFilters: RecordFilter<any>[]): Record[] {
    return this.records$.getValue().filter((record: Record) => {
      activeFilters.forEach((filter: RecordFilter<any>) => {
        switch (filter.filterType) {
          case FilterType.text:
            const filterCast = filter as RecordFilter<string>;
            const textAttribute: string = record[filterCast.key] as string;
            return (
              textAttribute.toLowerCase().indexOf(filter.value.toLowerCase()) >
              -1
            );
          // case FilterType.dateRange:
          //   const dateRangeAttribute: DateRangeFilterValue = record[filter.key].v
          //   return (
          //     dateRangeAttribute.startingDate <= filter.value &&
          //     dateRangeAttribute.endingDate >= filter.value
          //   );
          default:
            return true;
        }
      });
    });
  }
}
