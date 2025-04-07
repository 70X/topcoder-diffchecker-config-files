import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  WorkingFiles,
  FileLines,
  LineInfo,
} from '@features/network/models/file.model';

@Component({
  selector: 'her-network-working-view',
  templateUrl: './network-working-view.component.html',
  styleUrls: ['./network-working-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkWorkingViewComponent implements OnInit {
  @Input() files: WorkingFiles;
  @Output() filterIn: EventEmitter<string[]> = new EventEmitter();
  @Output() filterOut: EventEmitter<string[]> = new EventEmitter();
  public selectLine: number;

  public currentChangeLine: number;
  public inputSearch: string;
  public searchPosList: number[];
  public currentSearchLine: number;
  public panelOpenState = false;

  public applySearch(search: string): void {
    search = search || '';
    if (!this.inputSearch || this.inputSearch !== search) {
      this.searchPosList = [
        ...this.searchTextInFiles(this.files.source, search),
        ...this.searchTextInFiles(this.files.target, search),
      ];
      this.currentSearchLine = this.searchPosList.length > 0 ? 1 : null;
      this.inputSearch = search;
    }
    this.searchNext();
  }

  public searchNext(): void {
    if (!this.currentSearchLine) {
      return;
    }
    this.currentSearchLine =
      this.currentSearchLine + 1 > this.searchPosList.length
        ? 1
        : this.currentSearchLine + 1;

    this.selectLine = this.searchPosList[this.currentSearchLine - 1];
  }

  public searchPrev(): void {
    if (!this.currentSearchLine) {
      return;
    }
    this.currentSearchLine =
      this.currentSearchLine - 1 <= 0
        ? this.searchPosList.length
        : this.currentSearchLine - 1;

    this.selectLine = this.searchPosList[this.currentSearchLine - 1];
  }

  public changeNext(): void {
    this.currentChangeLine =
      this.currentChangeLine + 1 > this.files.diffList.length
        ? 1
        : this.currentChangeLine + 1;

    this.selectSourceDiffLine(this.currentChangeLine - 1);
  }

  public changePrev(): void {
    this.currentChangeLine =
      this.currentChangeLine - 1 <= 0
        ? this.files.diffList.length
        : this.currentChangeLine - 1;

    this.selectSourceDiffLine(this.currentChangeLine - 1);
  }

  private selectSourceDiffLine(currentChangeLine: number): void {
    const diff = this.files.diffList[currentChangeLine];
    this.selectLine = diff.source.from;
  }

  private searchTextInFiles(file: FileLines, search: string): number[] {
    return file.lines
      .filter(
        (l: LineInfo) =>
          l &&
          l.text.toLowerCase().trim().indexOf(search.toLowerCase().trim()) > -1
      )
      .map((l: LineInfo) =>
        file.lines.findIndex(
          (line: LineInfo) => line && line.position == l.position
        )
      );
  }

  ngOnInit(): void {
    this.currentChangeLine = this.files.diffList.length > 1 ? 1 : null;
  }
}
