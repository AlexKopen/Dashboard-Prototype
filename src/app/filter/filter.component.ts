import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterType, RecordFilter } from '../shared/models';
import { Store } from '@ngxs/store';
import { UpdateFilters } from '../shared/dashboard.state';

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
    status: new FormControl('')
    // dateRange: new FormGroup({
    //   created: new FormControl(''),
    //   modified: new FormControl('')
    // })
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.recordFilterForm.valueChanges.subscribe(value => {
      const filters: RecordFilter<any>[] = [];

      Object.keys(value).forEach((key: string) => {
        if (value[key].length > 0) {
          filters.push(
            new RecordFilter<string>(FilterType.text, key, value[key])
          );
        }
      });

      this.store.dispatch(new UpdateFilters(filters));
    });
  }
}
