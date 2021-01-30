import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }


  login(model: any): Observable <any>{
    return this.http.post(this.baseUrl + 'Accounts/login', model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            user.token = '';
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser = user;
            console.log(this.currentUser);
            return true;
          }
        })
      );
  }

  register(user: User): Observable <any>{
    return this.http.post(this.baseUrl + 'accounts/register', user);
  }

  loggedIn(): boolean {
    let expired: boolean;
    const token = localStorage.getItem('token');
    expired =  !this.jwtHelper.isTokenExpired(token);
    return expired;
  }
}
