import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  constructor() { }

  private activitySource = new Subject<string>();

  activity$ = this.activitySource.asObservable();

  logActivity(activity: string) {
    this.activitySource.next(activity);
  }

}
