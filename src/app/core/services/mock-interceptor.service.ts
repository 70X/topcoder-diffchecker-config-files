import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockInterceptorService implements HttpInterceptor {
  private PRINT_PARAMETERS = true;
  private API_PATH = 'api/';
  private API_PATH_MOCK = './assets/api/';
  private API_FORMAT_JSON = '.json';

  private API_PATH_ALLOWED: string[] = ['/'];
  private API_MOCK_DELAY = 300;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url: string = request.url;
    const method: string = request.method;

    if (this.mockPathEnable(url)) {
      if (this.PRINT_PARAMETERS) {
        console.log('Form Data Body: %o', { url, params: request.body });
      }
      url = this.urlManipulation(url);
      url += '.' + method + this.API_FORMAT_JSON;

      const req = request.clone({ url: url, method: 'GET' });
      return next.handle(req).pipe(delay(this.API_MOCK_DELAY));
    }

    return next.handle(request);
  }

  private urlManipulation(url: string): string {
    url = url.replace(this.API_PATH, this.API_PATH_MOCK);

    if (/[^.]\/[0-9]+\/[^.]/.test(url)) {
      url = url.replace(/([0-9])+/gi, 'X');
    }
    // remove last details like :id and parameters
    if (/[^.]\/[0-9]+/.test(url)) {
      url = url.substring(0, url.lastIndexOf('/'));
    }
    // remove ?id=etc.
    if (/[^.]+[?]+[^.]/.test(url)) {
      url = url.substring(0, url.lastIndexOf('?'));
    }
    return url;
  }

  private mockPathEnable(url: string): boolean {
    return (
      url.startsWith(this.API_PATH) &&
      this.API_PATH_ALLOWED.filter((item) => url.indexOf(item) != -1).length > 0
    );
  }
}
