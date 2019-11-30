import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';
import * as moment from "moment";
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { AppError } from '../errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendBaseUrl: string = environment.backendBaseUrl;
  private tokenStr: string = "token";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  Login(body: Login){
    return this.http.post(this.backendBaseUrl+"auth/login", body)
    .pipe(
      catchError(this.handleError)
      );
  }
  logout() {
    localStorage.removeItem(this.tokenStr);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenStr);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getExpiration() {
    const token = localStorage.getItem(this.tokenStr);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return moment(expirationDate);
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 404)
      return throwError ( new NotFoundError());
    if(error.status === 400)
      return throwError ( new BadRequestError(error));
    return throwError ( new AppError(error));
  }
}
