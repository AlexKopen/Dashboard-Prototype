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
    const filteredRecords: Record[] = [];

    state.allRecords.forEach((record: Record) => {
      let recordIsMatch = true;
      state.filters.forEach((filter: RecordFilter<any>) => {
        switch (filter.filterType) {
          case FilterType.text:
            const textFilterCast = filter as RecordFilter<string>;
            const textAttributeSelection: string = (record as any)[
              textFilterCast.key
            ];
            if (
              !textAttributeSelection ||
              !textFilterCast.value ||
              textAttributeSelection
                .toLowerCase()
                .indexOf(textFilterCast.value.toLowerCase()) === -1
            ) {
              recordIsMatch = false;
            }
            break;

          case FilterType.number:
            const numberFilterCast = filter as RecordFilter<number>;
            const numberAttributeSelection: number = (record as any)[
              numberFilterCast.key
            ];
            if (
              !numberAttributeSelection ||
              !numberFilterCast.value ||
              numberAttributeSelection >= numberFilterCast.value
            ) {
              recordIsMatch = false;
            }
            break;

          case FilterType.date:
            const dateFilterCast = filter as RecordFilter<number>;
            const dateAttributeSelection: Date = new Date(
              (record as any)[dateFilterCast.key]
            );
            if (!dateAttributeSelection || !dateFilterCast.value) {
              recordIsMatch = false;
            }

            if (dateAttributeSelection.getTime() < dateFilterCast.value) {
              recordIsMatch = false;
            }
            break;
        }
      });

      if (recordIsMatch) {
        filteredRecords.push(record);
      }
    });

    return filteredRecords;
  }
}
