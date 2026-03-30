import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private hasFriendsNotificationsSubject = new BehaviorSubject<boolean>(false);
  hasFriendsNotifications$ = this.hasFriendsNotificationsSubject.asObservable();

  setHasFriendsNotifications(value: boolean): void {
    this.hasFriendsNotificationsSubject.next(value);
  }
}