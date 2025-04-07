import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'her-network-file-upload-button',
  templateUrl: './network-file-upload-button.component.html',
  styleUrls: ['./network-file-upload-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkFileUploadButtonComponent {
  @Input() label: string;
  @Input() path: string;
  @Output() toUpload: EventEmitter<File> = new EventEmitter();
  @ViewChild('fileSelector') fileSelector;

  public upload($event: any): void {
    this.path = null;
    const files = $event.srcElement.files;
    this.toUpload.emit(files[0]);
  }
}
