export enum SnackbarType {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

export interface SnackbarNotification {
  type: SnackbarType;
  message: string;
  action: string;
  duration: number;
}
