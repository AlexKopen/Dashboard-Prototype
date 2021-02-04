import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardStateModel, Record } from '../shared/models';

@Component({
  selector: 'app-record-grid',
  templateUrl: './record-grid.component.html',
  styleUrls: ['./record-grid.component.scss']
})
export class RecordGridComponent implements OnInit {
  private dashboardState$: Observable<DashboardStateModel>;
  recordsToDisplay: Record[] = [];

  constructor(private store: Store) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    this.dashboardState$.subscribe((dashboardState: DashboardStateModel) => {
      this.recordsToDisplay =
        dashboardState.filteredRecords.length > 0
          ? dashboardState.filteredRecords
          : dashboardState.allRecords;
    });
  }
}
