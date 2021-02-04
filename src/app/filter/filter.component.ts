import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterType, RecordFilter } from '../shared/models';
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
    created: new FormControl(''),
    modified: new FormControl('')
  });

  private numberKeys: string[] = ['budget'];
  private dateKeys: string[] = ['created', 'modified'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.recordFilterForm.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      Object.keys(value).forEach((key: string) => {
        if (value[key]) {
          if (this.numberKeys.includes(key)) {
            filters.push(
              new RecordFilter<number>(FilterType.number, key, +value[key])
            );
          } else if (this.dateKeys.includes(key)) {
            filters.push(
              new RecordFilter<Date>(FilterType.date, key, new Date(value[key]))
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
  }
}
