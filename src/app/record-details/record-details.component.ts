import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardStateModel, Record } from '../shared/models';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})
export class RecordDetailsComponent implements OnInit, OnDestroy {
  private dashboardState$: Observable<DashboardStateModel>;
  public activeRecord: Record | undefined;
  public pageData: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    // Fetch the route params and dashboard state
    this.pageData = combineLatest([
      this.route.params,
      this.dashboardState$
    ]).subscribe(value => {
      this.activeRecord = value[1].allRecords.find((record: Record) => {
        return record.id === +value[0].id;
      });
    });
  }

  ngOnDestroy(): void {
    this.pageData.unsubscribe();
  }
}
