import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FilesUpload, WorkingFiles } from '@features/network/models/file.model';
import { SnackBarNotifiactionService } from '@core/services/snack-bar-notifiaction.service';
import {
  SnackbarType,
  SnackbarNotification,
} from '@core/models/notification.model';

@Component({
  selector: 'her-network-files-upload',
  templateUrl: './network-files-upload.component.html',
  styleUrls: ['./network-files-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkFilesUploadComponent {
  @Input() files: WorkingFiles;
  @Output() filesUpload: EventEmitter<FilesUpload> = new EventEmitter();
  public source: File;
  public target: File;

  constructor(private snackbarNotification: SnackBarNotifiactionService) {}

  uploadSource(file: File): void {
    this.source = file;
  }

  uploadTarget(file: File): void {
    this.target = file;
  }

  public upload(): void {
    this.source =
      this.source || (this.files ? this.files.source.filePath : null);
    this.target =
      this.target || (this.files ? this.files.target.filePath : null);
    if (!this.source || !this.target) {
      const toast = {
        type: SnackbarType.ERROR,
        message: 'Please select both files',
      } as SnackbarNotification;
      this.snackbarNotification.setSnackbarMessage(toast);
      return;
    }
    const toUpload: FilesUpload = {
      source: this.source,
      target: this.target,
    };
    this.filesUpload.emit(toUpload);
  }
}
