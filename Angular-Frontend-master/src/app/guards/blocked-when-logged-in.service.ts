import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/services&Validtors/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedWhenLoggedInService {

  constructor(private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('REFRESH_TOKEN')) {
      console.log('blocked when logged in')
      return false


    } else {
      console.log('not logged in so not blocked')
      return true
    }
  }
}
