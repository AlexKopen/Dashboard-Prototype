import { Injectable } from '@angular/core';
import { FilterType, Record, RecordFilter } from './models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  allRecords$: Observable<Record[]>;

  constructor(private store: Store) {
    this.allRecords$ = this.store.select(state => state.dashboard.allRecords);
  }

  public filterRecords(filters: RecordFilter<any>[]): void {
    this.allRecords$.subscribe((records: Record[]) => {
      const filteredRecords: Record[] = records.filter((record: Record) => {
        filters.forEach((filter: RecordFilter<any>) => {
          switch (filter.filterType) {
            case FilterType.text:
              const filterCast = filter as RecordFilter<string>;
              const textAttribute: string = (record as any)[filterCast.key] as string;
              return (
                textAttribute
                  .toLowerCase()
                  .indexOf(filter.value.toLowerCase()) > -1
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

      console.log(filteredRecords);
    });
  }
}
