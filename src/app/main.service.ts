import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, fromEventPattern } from 'rxjs';

import { environment } from '../environments/environment';

import { PostLoginModel } from './login/postLoginModel';

@Injectable({
    providedIn: 'root'
})
export class MainServices {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.apiBaseUrl}`;

  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  public token: string;
  public userFullName: string;

  login(data: PostLoginModel) {
    return this.http.post<{token: string}>(this.baseurl + 'user/login', data);
  }

  logout() {
    this.clearAuthData();
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation.token) {
      return;
    }

    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  getAuthData() {
    const token = localStorage.getItem('x-sol-web-token');

    return {
      token
    };
  }

  saveAuthData(token: string) {

    localStorage.setItem('token', token);

    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  clearAuthData() {
    localStorage.removeItem('token');
  }

}
