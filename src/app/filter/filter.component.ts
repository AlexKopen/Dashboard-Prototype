import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeSelection, FilterType, RecordFilter } from '../shared/models';
import { Store } from '@ngxs/store';
import {
  PopulateFilteredRecords,
  UpdateFilters
} from '../shared/dashboard.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public recordFilterForm = new FormGroup({
    title: new FormControl(''),
    division: new FormControl(''),
    project_owner: new FormControl(''),
    budget: new FormControl(''),
    status: new FormControl(''),
    createdStart: new FormControl(''),
    createdEnd: new FormControl(''),
    modifiedStart: new FormControl(''),
    modifiedEnd: new FormControl('')
  });

  textKeys: string[] = ['title', 'division', 'project_owner', 'status'];
  numberKeys: string[] = ['budget'];
  dateKeys: string[] = [
    'createdStart',
    'createdEnd',
    'modifiedStart',
    'modifiedEnd'
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // On each form change, create new filter values to pass to the store
    this.recordFilterForm.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      // Create record filter objects based on the filter's data type
      Object.keys(value).forEach((key: string) => {
        if (value[key]) {
          if (this.textKeys.includes(key)) {
            filters.push(
              new RecordFilter<string>(FilterType.text, key, value[key])
            );
          } else if (this.numberKeys.includes(key)) {
            filters.push(
              new RecordFilter<number>(FilterType.number, key, +value[key])
            );
          } else if (this.dateKeys.includes(key)) {
            if (
              key.indexOf('created') > -1 &&
              value.createdStart &&
              value.createdEnd
            ) {
              filters.push(
                new RecordFilter<DateRangeSelection>(
                  FilterType.date,
                  'created',
                  new DateRangeSelection(value.createdStart, value.createdEnd)
                )
              );
            } else if (
              key.indexOf('modified') > -1 &&
              value.modifiedStart &&
              value.modifiedEnd
            ) {
              filters.push(
                new RecordFilter<DateRangeSelection>(
                  FilterType.date,
                  'modified',
                  new DateRangeSelection(value.modifiedStart, value.modifiedEnd)
                )
              );
            }
          }
        }
      });

      // Update the store
      this.store.dispatch(new UpdateFilters(filters));

      // If no filters are passed, show all records
      if (filters.length === 0) {
        this.store.dispatch(new PopulateFilteredRecords());
      }
    });
  }
}
