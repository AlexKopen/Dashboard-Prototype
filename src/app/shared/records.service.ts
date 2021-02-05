import { Injectable } from '@angular/core';
import {
  DashboardStateModel,
  DateRangeSelection,
  FilterType,
  Record,
  RecordFilter
} from './models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor() {}

  // Filter records based on the record filter objects currently in the state
  public filterRecords(state: DashboardStateModel): Record[] {
    const filteredRecords: Record[] = [];

    // Iterate through each record, processing all filters for each
    state.allRecords.forEach((record: Record) => {
      let recordIsMatch = true;
      state.filters.forEach((filter: RecordFilter<any>) => {
        switch (filter.filterType) {
          // Check to see if the attribute value contains the substring of the entered text
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

          //  Ensure the budget is below the entered number
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

          //  Ensure the date occurs between the start and end date
          case FilterType.date:
            const dateFilterCast = filter as RecordFilter<DateRangeSelection>;
            let dateAttributeSelection: Date;

            if (filter.key.indexOf('created') > -1) {
              dateAttributeSelection = new Date(record.created);
            } else {
              dateAttributeSelection = new Date(record.modified);
            }

            if (
              !dateFilterCast.value.startingDate ||
              !dateFilterCast.value.endingDate
            ) {
              recordIsMatch = false;
            }

            if (
              !dateAttributeSelection ||
              !dateFilterCast.value.startingDate ||
              !dateFilterCast.value.endingDate
            ) {
              recordIsMatch = true;
            } else if (
              dateAttributeSelection.getTime() <
                dateFilterCast.value.startingDate.getTime() ||
              dateAttributeSelection.getTime() >
                dateFilterCast.value.endingDate.getTime()
            ) {
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
