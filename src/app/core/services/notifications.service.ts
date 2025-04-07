import { Injectable } from '@angular/core';
import { SnackBarNotifiactionService } from '@core/services/snack-bar-notifiaction.service';
import {
  SnackbarNotification,
  SnackbarType,
} from '@core/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly errorsMessage = {
    401: 'Unauthorized operation',
    404: 'Request not found',
    503: 'Service temporarily out of service',
  };
  constructor(private snackbarNotification: SnackBarNotifiactionService) {}

  public responseError(error: any): void {
    const msg = this.errorsMessage[error.status] || error.statusText;
    const toast = {
      type: SnackbarType.ERROR,
      message: msg,
    } as SnackbarNotification;

    this.snackbarNotification.setSnackbarMessage(toast);
  }

  public responseSuccess(msg?: string): void {
    const toast = {
      type: SnackbarType.SUCCESS,
      message: msg || 'Operation completed successfully',
    } as SnackbarNotification;

    this.snackbarNotification.setSnackbarMessage(toast);
  }
}
