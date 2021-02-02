import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Record } from './models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  records$: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);

  constructor() {}
}
