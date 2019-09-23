import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../core/activity-log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  activityList: string[] = [];

  constructor(private activityService: ActivityLogService) {
    activityService.activity$.subscribe(
      activity => this.activityList.push(activity)
    );
  }

  ngOnInit() {
  }

}
