import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'her-network-area-tab',
  templateUrl: './network-area-tab.component.html',
  styleUrls: ['./network-area-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkAreaTabComponent {
  @Input() title: string;
  @Input() tooltip: string;
  @Input() withBack: boolean;
  @Input() withReset: boolean;
  @Output() goBack: EventEmitter<void> = new EventEmitter();
  @Output() reset: EventEmitter<void> = new EventEmitter();
}
