import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { WorkingFiles } from '@features/network/models/file.model';
import { FormControl } from '@angular/forms';

enum FilterType {
  IN,
  OUT,
}
@Component({
  selector: 'her-network-working-filters',
  templateUrl: './network-working-filters.component.html',
  styleUrls: ['./network-working-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkWorkingFiltersComponent implements OnInit {
  @Input() files: WorkingFiles;
  @Output() filterIn: EventEmitter<string[]> = new EventEmitter();
  @Output() filterOut: EventEmitter<string[]> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  public inputSearch: FormControl;
  public inputFilterIn: FormControl;
  public inputFilterOut: FormControl;
  public toggleFilter: FormControl;
  public FilterType = FilterType;

  public applyFilterIn(): void {
    const filterList = this.extractFilterString(this.inputFilterIn.value);
    this.filterIn.emit(filterList);
  }

  public applyFilterOut(): void {
    const filterList = this.extractFilterString(this.inputFilterOut.value);
    this.filterOut.emit(filterList);
  }

  public applySearch(): void {
    this.search.emit(this.inputSearch.value);
  }

  private extractFilterString(value: string): string[] {
    return value
      ? value
          .split(',')
          .filter((text: string) => !!text)
          .map((text: string) => text.trim())
      : [];
  }

  ngOnInit(): void {
    this.inputFilterIn = new FormControl();
    this.inputFilterOut = new FormControl();
    this.inputSearch = new FormControl();
    this.toggleFilter = new FormControl(FilterType.IN);
  }
}
