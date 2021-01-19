import { Injectable } from '@angular/core';
import {CanActivate, UrlTree, Router} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public loginPageUri = ['/log-in'];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
  }

  canActivate(): boolean | UrlTree {
    return this.auth.getActualState() ? true : this.router.createUrlTree(this.loginPageUri);
  }
}
