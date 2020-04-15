import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MainServices } from './main.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(private mainService: MainServices) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.mainService.getAuthData();

    const authRequest = req.clone({
      headers: req.headers
        .set('token', 'Brearer' + authToken.token)
    });
    return next.handle(authRequest);
  }
}
