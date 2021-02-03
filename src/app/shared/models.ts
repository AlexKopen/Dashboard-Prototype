export interface Record {
  title: string;
  division: string;
  project_owner: string;
  budget: number;
  status: string;
  created: string;
  modified: string;
}

export enum FilterType {
  text,
  number
}

export class RecordFilter {
  filterType: FilterType;
  key: string;
  value: T;
}
