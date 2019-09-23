import { Component } from '@angular/core';
import { ActivityLogService } from './core/activity-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private activityService: ActivityLogService) { }
  
  logActivity(activity: string) {
    this.activityService.logActivity(activity);
  }
}
