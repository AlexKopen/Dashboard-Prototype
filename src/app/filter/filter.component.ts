import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../shared/records.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public recordFilterForm = new FormGroup({
    title: new FormControl(''),
    division: new FormControl(''),
    projectOwner: new FormControl(''),
    budget: new FormControl(''),
    status: new FormControl(''),
    dateRange: new FormGroup({
      created: new FormControl(''),
      modified: new FormControl('')
    })
  });

  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.recordFilterForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }
}
