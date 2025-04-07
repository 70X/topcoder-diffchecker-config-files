import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'her-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputTextComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: FormControl;
}
