import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FileLines, ActionType } from '@features/network/models/file.model';

@Component({
  selector: 'her-network-diff-window',
  templateUrl: './network-diff-window.component.html',
  styleUrls: ['./network-diff-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkDiffWindowComponent {
  @Input() file: FileLines;
  @Input() highlightText: string;
  @Input() set scrollTo(y: number) {
    if (y != null) {
      this.scrollElement.nativeElement.scrollTop = y;
    }
  }
  @Input() set selectLine(row: number) {
    if (row != null && this.scrollElement.nativeElement.children[row]) {
      this.select = row;
      const y =
        this.scrollElement.nativeElement.children[row].offsetTop -
        this.scrollElement.nativeElement.offsetTop;
      this.scrollElement.nativeElement.scrollTop = y;
    }
  }
  @Output() scroll: EventEmitter<number> = new EventEmitter();
  @ViewChild('scrollElement') scrollElement: ElementRef;

  public select: number;
  public ActionType = ActionType;

  performScroll($event: Event): void {
    this.scroll.emit(($event.srcElement as any).scrollTop);
  }
}
