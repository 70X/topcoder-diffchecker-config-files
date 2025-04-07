import { NgModule } from '@angular/core';
import { SharedModule } from '@features/shared/shared.module';
import { SnackBarNotificationComponent } from '@features/shared/components/snack-bar-notification/snack-bar-notification.component';
import { DashboardPageComponent } from './network/containers/dashboard-page/dashboard-page.component';
import { NetworkWorkingViewComponent } from './network/components/network-working-view/network-working-view.component';
import { NetworkWorkingFilesComponent } from './network/components/network-working-files/network-working-files.component';
import { NetworkWorkingFiltersComponent } from './network/components/network-working-filters/network-working-filters.component';
import { NetworkAreaComponent } from './network/components/network-area/network-area.component';
import { NetworkFilesUploadComponent } from './network/components/network-files-upload/network-files-upload.component';
import { NetworkFileUploadButtonComponent } from './network/components/network-file-upload-button/network-file-upload-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NetworkDiffWindowComponent } from './network/components/network-diff-window/network-diff-window.component';
import { HighlightPipe } from './network/pipes/highlight.pipe';
import { NetworkAreaTabComponent } from './network/components/network-area-tab/network-area-tab.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    NetworkWorkingViewComponent,
    NetworkWorkingFilesComponent,
    NetworkWorkingFiltersComponent,
    NetworkAreaComponent,
    NetworkFilesUploadComponent,
    NetworkFileUploadButtonComponent,
    NetworkDiffWindowComponent,
    HighlightPipe,
    NetworkAreaTabComponent,
  ],
  imports: [SharedModule],
  exports: [MatSnackBarModule, SnackBarNotificationComponent, HighlightPipe],
})
export class HerculesModule {}
