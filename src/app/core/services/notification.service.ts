import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {message: string, type: NotificationType}

export enum NotificationType {
  Success = 0,
  Error = 1
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notification = new Subject<Notification>();

  nextNotification$ = this._notification.asObservable();

  constructor() { }

  notify(notification: Notification){
    this._notification.next(notification);
  }

  clear() {
    this._notification.next(undefined!);
  }
}
