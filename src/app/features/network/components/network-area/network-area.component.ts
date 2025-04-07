import { Component } from '@angular/core';
import { WorkingFiles, FilesUpload } from '@features/network/models/file.model';
import { NetworkConfigService } from '@features/network/services/network-config.service';
import { NotificationsService } from '@core/services/notifications.service';
import { finalize } from 'rxjs/operators';

enum ViewType {
  FILES,
  WORKING_AREA,
}
@Component({
  selector: 'her-network-area',
  templateUrl: './network-area.component.html',
  styleUrls: ['./network-area.component.scss'],
})
export class NetworkAreaComponent {
  public originFiles: WorkingFiles;
  public currentFiles: WorkingFiles;
  public view: ViewType = ViewType.FILES;
  public ViewType = ViewType;
  public loading: boolean;

  constructor(
    private networkConfigService: NetworkConfigService,
    private notificationService: NotificationsService
  ) {}

  public resetData(): void {
    this.currentFiles = { ...this.originFiles };
  }

  public filesUpload(toUpload: FilesUpload): void {
    this.loading = true;
    this.networkConfigService
      .filesUpload(toUpload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (workingFiles: WorkingFiles) => {
          this.originFiles = workingFiles;
          this.currentFiles = { ...this.originFiles };
          this.view = ViewType.WORKING_AREA;
        },
        (error: any) => this.notificationService.responseError(error)
      );
  }

  public filterIn(lines: string[]): void {
    this.loading = true;
    this.networkConfigService
      .filterIn(lines)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (workingFiles: WorkingFiles) => (this.currentFiles = workingFiles),
        (error: any) => this.notificationService.responseError(error)
      );
  }

  public filterOut(lines: string[]): void {
    this.loading = true;
    this.networkConfigService
      .filterOut(lines)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (workingFiles: WorkingFiles) => (this.currentFiles = workingFiles),
        (error: any) => this.notificationService.responseError(error)
      );
  }
}
