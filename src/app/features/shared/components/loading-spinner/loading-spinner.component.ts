import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'her-loading-spinner',
  template: `
    <div class="loading-spinner" fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner class="loading-spinner__mat"></mat-spinner>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
