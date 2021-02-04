import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeSelection, FilterType, RecordFilter } from '../shared/models';
import { Store } from '@ngxs/store';
import {
  PopulateFilteredRecords,
  UpdateFilters
} from '../shared/dashboard.state';
import { RecordsService } from '../shared/records.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public createdDateRange = new FormGroup({
    createdStart: new FormControl(''),
    createdEnd: new FormControl('')
  });

  public modifiedDateRange = new FormGroup({
    modifiedStart: new FormControl(''),
    modifiedEnd: new FormControl('')
  });

  public recordFilterForm = new FormGroup({
    title: new FormControl(''),
    division: new FormControl(''),
    project_owner: new FormControl(''),
    budget: new FormControl(''),
    status: new FormControl('')
  });

  private numberKeys: string[] = ['budget'];

  constructor(private store: Store, private recordService: RecordsService) {}

  ngOnInit(): void {
    this.recordFilterForm.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      Object.keys(value).forEach((key: string) => {
        if (value[key]) {
          if (this.numberKeys.includes(key)) {
            filters.push(
              new RecordFilter<number>(FilterType.number, key, +value[key])
            );
          } else if (value[key].length > 0) {
            filters.push(
              new RecordFilter<string>(FilterType.text, key, value[key])
            );
          }
        }
      });

      this.store.dispatch(new UpdateFilters(filters));

      if (filters.length === 0) {
        this.store.dispatch(new PopulateFilteredRecords());
      }
    });

    this.createdDateRange.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      if (value.createdStart && value.createdEnd) {
        filters.push(
          new RecordFilter<DateRangeSelection>(
            FilterType.date,
            'created',
            new DateRangeSelection(
              value.createdStart,
              value.createdEnd,
              'created'
            )
          )
        );
        this.store.dispatch(new UpdateFilters(filters));
      }
    });

    this.modifiedDateRange.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      if (
        value.modifiedStart &&
        value.modifiedEnd &&
        String(value.modifiedStart.getFullYear()).length === 4 &&
        String(value.modifiedEnd.getFullYear()).length === 4
      ) {
        filters.push(
          new RecordFilter<DateRangeSelection>(
            FilterType.date,
            'modified',
            new DateRangeSelection(
              value.modifiedStart,
              value.modifiedEnd,
              'modified'
            )
          )
        );
        this.store.dispatch(new UpdateFilters(filters));
      } else {
        // this.recordService.
      }
    });
  }
}
