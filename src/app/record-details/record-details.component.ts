import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardStateModel, Record } from '../shared/models';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})
export class RecordDetailsComponent implements OnInit {
  private dashboardState$: Observable<DashboardStateModel>;
  public activeRecord: Record | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.dashboardState$]).subscribe(
      value => {
        this.activeRecord = value[1].allRecords.find((record: Record) => {
          return record.id === +value[0].id;
        });
      }
    );
  }
}
