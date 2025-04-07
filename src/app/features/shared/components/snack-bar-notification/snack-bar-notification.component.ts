import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SnackBarNotifiactionService } from '@core/services/snack-bar-notifiaction.service';
import {
  SnackbarType,
  SnackbarNotification,
} from '@core/models/notification.model';

@Component({
  selector: 'her-snack-bar-notification',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarNotificationComponent implements OnInit, OnDestroy {
  public type: SnackbarType;
  public SnackbarType: typeof SnackbarType = SnackbarType;
  private subscription: Subscription;
  private classType: any;

  constructor(
    private snackBar: MatSnackBar,
    private snackbarService: SnackBarNotifiactionService
  ) {}

  openSnackBar({
    message,
    action = 'Close',
    duration,
    type = SnackbarType.INFO,
  }: SnackbarNotification): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: [this.classType[type]],
    });
  }

  ngOnInit(): void {
    this.classType = {
      [SnackbarType.SUCCESS]: 'mat-snackbar-success',
      [SnackbarType.ERROR]: 'mat-snackbar-error',
      [SnackbarType.WARNING]: 'mat-snackbar-warning',
      [SnackbarType.INFO]: 'mat-snackbar-info',
    };

    this.subscription = this.snackbarService
      .getSnackbarOnChanges()
      .subscribe((notification: SnackbarNotification) =>
        this.openSnackBar(notification)
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
