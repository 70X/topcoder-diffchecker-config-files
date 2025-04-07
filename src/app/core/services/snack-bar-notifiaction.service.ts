import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SnackbarNotification } from '@core/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class SnackBarNotifiactionService {
  private snackbarNotification: Subject<SnackbarNotification>;

  constructor() {
    this.snackbarNotification = new Subject();
  }
  public getSnackbarOnChanges(): Observable<SnackbarNotification> {
    return this.snackbarNotification.asObservable();
  }

  public setSnackbarMessage(notification: SnackbarNotification): void {
    this.snackbarNotification.next(notification);
  }
}
