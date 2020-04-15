import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MainServices } from './main.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    public auth: MainServices,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise <boolean> {
    if (!this.auth.getIsAuth()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
