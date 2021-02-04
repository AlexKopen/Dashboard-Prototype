import { Injectable } from '@angular/core';
import {
  DashboardStateModel,
  FilterType,
  Record,
  RecordFilter
} from './models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor() {}

  public filterRecords(state: DashboardStateModel): Record[] {
    console.log('filter records called');
    const recordsSet = new Set();

    state.filters.forEach((filter: RecordFilter<any>) => {
      state.allRecords.forEach((record: Record) => {
        switch (filter.filterType) {
          case FilterType.text:
            const filterCast = filter as RecordFilter<string>;
            const textAttribute: string = (record as any)[filterCast.key];
            if (
              textAttribute
                .toLowerCase()
                .indexOf(filterCast.value.toLowerCase()) > -1
            ) {
              recordsSet.add(record);
            }
        }
      });
    });

    return Array.from(recordsSet) as Record[];
  }
}
