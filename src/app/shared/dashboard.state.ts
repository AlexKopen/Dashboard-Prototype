import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DashboardStateModel, Record, RecordFilter } from './models';
import { RecordsService } from './records.service';

export class UpdateAllRecords {
  static readonly type = '[Dashboard] Update All Records';

  constructor(public records: Record[]) {}
}

export class UpdateFilters {
  static readonly type = '[Dashboard] Update Filters';

  constructor(public filters: RecordFilter<any>[]) {}
}

export class PopulateFilteredRecords {
  static readonly type = '[Dashboard] Populate Filtered Records';
  constructor() {}
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    allRecords: [],
    filters: [],
    filteredRecords: []
  }
})
@Injectable()
export class DashboardState {
  constructor(private recordsService: RecordsService) {}

  @Action(UpdateAllRecords)
  updateAllRecords(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateAllRecords
  ): void {
    let state = ctx.getState();
    ctx.setState({
      ...state,
      allRecords: [...action.records]
    });

    state = ctx.getState();
    const filteredValues = this.recordsService.filterRecords(state);
    ctx.setState({
      ...state,
      filteredRecords: filteredValues
    });
  }

  @Action(UpdateFilters)
  updateFilters(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateFilters
  ): void {
    let state = ctx.getState();
    ctx.setState({
      ...state,
      filters: [...action.filters]
    });

    state = ctx.getState();
    const filteredValues = this.recordsService.filterRecords(state);
    ctx.setState({
      ...state,
      filteredRecords: filteredValues
    });
  }

  @Action(PopulateFilteredRecords)
  updateFilteredRecords(
    ctx: StateContext<DashboardStateModel>,
    action: PopulateFilteredRecords
  ): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      filteredRecords: [...state.allRecords]
    });
  }
}
