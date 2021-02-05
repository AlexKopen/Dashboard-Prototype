import { Component, OnInit } from '@angular/core';
import { SAMPLE_DATA } from './shared/constants';
import { Store } from '@ngxs/store';
import { UpdateAllRecords } from './shared/dashboard.state';
import { Record } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    // Parse and store the sample data in the state
    const sampleRecords: Record[] = JSON.parse(SAMPLE_DATA);
    sampleRecords.forEach((record, index) => {
      record.id = index;
    });

    this.store.dispatch(new UpdateAllRecords(sampleRecords));
  }
}
