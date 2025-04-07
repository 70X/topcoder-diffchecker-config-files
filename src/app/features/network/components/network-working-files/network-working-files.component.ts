import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { WorkingFiles } from '@features/network/models/file.model';

@Component({
  selector: 'her-network-working-files',
  templateUrl: './network-working-files.component.html',
  styleUrls: ['./network-working-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkWorkingFilesComponent {
  @Input() files: WorkingFiles;
  @Input() selectLine: number;
  @Input() highlightText: string;
  public sourceScrollTo: number;
  public targetScrollTo: number;
}
