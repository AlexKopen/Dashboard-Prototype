import { Component, OnInit } from '@angular/core';
import { SAMPLE_DATA } from './shared/constants';
import { Store } from '@ngxs/store';
import { UpdateAllRecords } from './shared/dashboard.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new UpdateAllRecords(JSON.parse(SAMPLE_DATA)));
  }
}
