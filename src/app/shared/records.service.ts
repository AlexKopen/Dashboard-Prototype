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
  public createdDateRange: DateRangeSelection;
  public modifiedDateRange: DateRangeSelection;

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
            const dateFilterCast = filter as RecordFilter<DateRangeSelection>;

            switch (dateFilterCast.value.attribute) {
              case 'created':
                this.createdDateRange = dateFilterCast.value;
                break;
              case 'modified':
                this.modifiedDateRange = dateFilterCast.value;
                break;
            }

            const dateAttributeSelection: Date = new Date(
              (record as any)[dateFilterCast.key]
            );

            if (this.modifiedDateRange) {
              if (
                !dateAttributeSelection ||
                !this.modifiedDateRange.startingDate ||
                !this.modifiedDateRange.endingDate
              ) {
                recordIsMatch = false;
              }

              if (
                dateAttributeSelection.getTime() >
                  new Date(this.modifiedDateRange.endingDate).getTime() ||
                dateAttributeSelection.getTime() <
                  new Date(this.modifiedDateRange.startingDate).getTime()
              ) {
                recordIsMatch = false;
              }

              if (
                (this.modifiedDateRange.startingDate.length > 0 &&
                  this.modifiedDateRange.startingDate.trim().length === 0) ||
                (this.modifiedDateRange.endingDate.length > 0 &&
                  this.modifiedDateRange.endingDate.trim().length === 0)
              ) {
                recordIsMatch = true;
              }
            }

            if (this.createdDateRange) {
              if (
                !dateAttributeSelection ||
                !this.createdDateRange.startingDate ||
                !this.createdDateRange.endingDate
              ) {
                recordIsMatch = false;
              }

              if (
                dateAttributeSelection.getTime() >
                  new Date(this.createdDateRange.endingDate).getTime() ||
                dateAttributeSelection.getTime() <
                  new Date(this.createdDateRange.startingDate).getTime()
              ) {
                recordIsMatch = false;
              }

              if (
                (this.createdDateRange.startingDate.length > 0 &&
                  this.createdDateRange.startingDate.trim().length === 0) ||
                (this.createdDateRange.endingDate.length > 0 &&
                  this.createdDateRange.endingDate.trim().length === 0)
              ) {
                recordIsMatch = true;
              }
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
