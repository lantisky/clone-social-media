import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, pipe} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData
      .pipe(
        map(user => user != null),
        tap(value => {
          if (!value){
            this.router.navigateByUrl('/login').then();
            return value;
          }
          else{
            return value;
          }
        })
      );
  }
}
