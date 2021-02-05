# Dashboard Prototype

Dashboard prototype application, built with Angular, Angular Material, and NGXS.

## Installation

```
npm install
```

## Usage

To run the application at `localhost:4200`, run the following command:
```
npm run start
```

## Technical Overview

### Data Models

`src/app/shared/models.ts`

```typescript
export interface Record {
  id: number;
  title: string;
  division: string;
  project_owner: string;
  budget: number;
  status: string;
  created: string;
  modified: string;
}

// Used to process different filter data types
export enum FilterType {
  text,
  number,
  date
}

// Record filter with a generic type
export class RecordFilter<T> {
  filterType: FilterType;
  key: string;
  value: T;

  constructor(filterType: FilterType, key: string, value: T) {
    this.filterType = filterType;
    this.key = key;
    this.value = value;
  }
}

// Application state
export interface DashboardStateModel {
  allRecords: Record[];
  filters: RecordFilter<any>[];
  filteredRecords: Record[];
}

// Date range selection for use with a date picker
export class DateRangeSelection {
  startingDate: Date;
  endingDate: Date;

  constructor(startingDate: Date, endingDate: Date) {
    this.startingDate = startingDate;
    this.endingDate = endingDate;
  }
}
```

### State management

[ngxs.io](NGXS) was used to implement state management throughout the application.

The following state actions are avaiable:
`src/app/shared/dashboard.state.ts`

```typescript
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
```

### Filtering

`src/app/shared/records.service.ts` contains a `filterRecords` function which iterates through each
`RecordFilter<T>` object stored in the state, and outputs the filtered Records.
