import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message?: string;
  isError?: boolean;

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.notifService.nextNotification$.subscribe(notification => {
      if (!!this.message){
        this.message = undefined;
      }
      this.message = notification?.message || '';
      this.isError = notification?.type === NotificationType.Error;

      if (!!this.message){
        setTimeout(() => {
          this.notifService.clear();
        }, 5000);
      }
      //TODO if time left: chain of notifications
    })
  }

}
