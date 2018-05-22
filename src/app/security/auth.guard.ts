import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { SecurityService } from "./security.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _securityService: SecurityService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Get property name on security object to check
    let claimType: string = next.data["claimType"];

    if (
      this._securityService.securityObject.isAuthenticated &&
      this._securityService.hasClaim(claimType)
    ) {
      return true;
    } else {
      this._router.navigate(["login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
