import { Component } from '@angular/core';

@Component({
  selector: 'her-root',
  template: `
    <her-snack-bar-notification></her-snack-bar-notification>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
