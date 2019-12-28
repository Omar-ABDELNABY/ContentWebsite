import { Injectable } from '@angular/core';
import { Section } from '../../common/models/section';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { AppError } from '../errors/app-error';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private backendBaseUrl: string = environment.backendBaseUrl;
  private urlPart: string = 'homepage';

  constructor(private httpClient: HttpClient) { }

  public sections: Section[];

  public getSections(): Observable<Object> {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    return this.httpClient.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
  }

  public editSection(id: string, section: Section, image: File): Observable<Object> {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    const sectionData = this.createFormDataFromModel(section, image);
    return this.httpClient.put(`${url}/${id}`, sectionData)
    .pipe(
      catchError(this.handleError)
      );
  }

  public addSection(section: Section, image: File): Observable<Object> {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    const sectionData = this.createFormDataFromModel(section, image);
    return this.httpClient.post(`${url}`, sectionData)
    .pipe(
      catchError(this.handleError)
      );
  }

  private createFormDataFromModel(section: Section, image: File): FormData{
    const sectionData = new FormData();
    sectionData.append('title', section.title);
    sectionData.append('body', section.body);
    sectionData.append('image', image, section.title);          //'image' here is the property name in BE by multer middleware - multer({storage}).single('image')
    return sectionData;
  }

  public deleteSection(sectionId: string): Observable<Object> {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    return this.httpClient.delete(`${url}/${sectionId}`)
    .pipe(
      catchError(this.handleError)
      );
  }
	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const url = `${this.backendBaseUrl}${this.urlPart}`;
    this.httpClient.get(url).subscribe(res => {
      console.log(res);
      this.sections = res as Section[];
    });
	}

  private handleError(error: HttpErrorResponse){
    if(error.status === 404)
      return throwError ( new NotFoundError());
    if(error.status === 400)
      return throwError ( new BadRequestError(error));
    return throwError ( new AppError(error));
  }


}
