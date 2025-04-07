import { NgModule } from '@angular/core';
import { MockInterceptorService } from './services/mock-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptorService,
      multi: true,
    },
  ],
  exports: [],
})
export class CoreModule {}
