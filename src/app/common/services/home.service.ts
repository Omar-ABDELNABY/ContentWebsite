import { Injectable } from '@angular/core';
import { TopicUnit } from '../../common/models/topic-unit';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { AppError } from '../errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private backendBaseUrl: string = environment.backendBaseUrl;
  private urlPart: string = 'homepage';

  constructor(private httpClient: HttpClient) { }

  public getUnits(): Observable<Object> {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    return this.httpClient.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 404)
      return throwError ( new NotFoundError());
    if(error.status === 400)
      return throwError ( new BadRequestError(error));
    return throwError ( new AppError(error));
  }


}
