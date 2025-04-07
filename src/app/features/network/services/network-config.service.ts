import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  WorkingFiles,
  FileDeserialize,
  FileSerialize,
  FilesUpload,
} from '../models/file.model';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkConfigService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public filesUpload(filesToUpload: FilesUpload): Observable<WorkingFiles> {
    return this.http
      .post(
        `${this.baseUrl}/files-upload`,
        FileSerialize.filesUpload(filesToUpload)
      )
      .pipe(
        map((record: any) => {
          const wf = FileDeserialize.workingFiles(record);
          wf.source.filePath = filesToUpload.source;
          wf.target.filePath = filesToUpload.target;
          return wf;
        }),
        catchError((error) => throwError(error))
      );
  }

  public filterIn(lines: string[]): Observable<WorkingFiles> {
    return this.http
      .put(`${this.baseUrl}/filter-in`, FileSerialize.filter(lines))
      .pipe(
        map((record: any) => FileDeserialize.workingFiles(record)),
        catchError((error) => throwError(error))
      );
  }

  public filterOut(lines: string[]): Observable<WorkingFiles> {
    return this.http
      .put(`${this.baseUrl}/filter-out`, FileSerialize.filter(lines))
      .pipe(
        map((record: any) => FileDeserialize.workingFiles(record)),
        catchError((error) => throwError(error))
      );
  }
}
