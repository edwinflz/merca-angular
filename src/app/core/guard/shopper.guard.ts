import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/tokens/token.service';

@Injectable({
  providedIn: 'root'
})
export class ShopperGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const status = this.tokenService.getHasProfile();

    if (+status !== 404) {
      return true;
    }
    this.router.navigate(['shopper/account']);
    return false;
  }

}
