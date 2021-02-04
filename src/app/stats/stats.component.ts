import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardStateModel, Record } from '../shared/models';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  private dashboardState$: Observable<DashboardStateModel>;
  private dashboardState: DashboardStateModel;

  constructor(private store: Store) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    this.dashboardState$.subscribe((state: DashboardStateModel) => {
      this.dashboardState = state;
    });
  }

  get recordCount(): number {
    return this.dashboardState.allRecords.length;
  }

  get averageBudget(): number {
    return (
      this.dashboardState.allRecords.reduce((previousValue, currentValue) => {
        return previousValue + +currentValue.budget;
      }, 0) / this.dashboardState.allRecords.length
    );
  }

  get activeCount(): number {
    return this.dashboardState.allRecords.filter((record: Record) => {
      return record.status.toLowerCase() === 'working';
    }).length;
  }
}
