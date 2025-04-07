import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SnackBarNotificationComponent } from './components/snack-bar-notification/snack-bar-notification.component';
import { FormInputTextComponent } from './components/form/form-input-text/form-input-text.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OccurrencesControlComponent } from './components/occurrences-control/occurrences-control.component';

const compontents = [
  HeaderComponent,
  SnackBarNotificationComponent,
  FormInputTextComponent,
  LoadingSpinnerComponent,
  OccurrencesControlComponent,
];

const modules = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [...compontents],
  imports: [...modules],
  exports: [...modules, ...compontents],
})
export class SharedModule {}
