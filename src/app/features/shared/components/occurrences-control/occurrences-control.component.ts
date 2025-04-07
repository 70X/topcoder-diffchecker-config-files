import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'her-occurrences-control',
  templateUrl: './occurrences-control.component.html',
  styleUrls: ['./occurrences-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccurrencesControlComponent {
  @Input() label: string;
  @Input() current: number;
  @Input() total: number;
  @Output() next: EventEmitter<number> = new EventEmitter();
  @Output() prev: EventEmitter<number> = new EventEmitter();
}
