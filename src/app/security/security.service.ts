///<reference path="../../../node_modules/rxjs/internal/observable/of.d.ts"/>
import { Injectable } from "@angular/core";
import { AppUserAuth } from "./app-user-auth";
import { AppUser } from "./app-user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";

const API_URL = "http://localhost:5000/api/security/";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private _http: HttpClient) {}

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    return this._http
      .post<AppUserAuth>(API_URL + "login", entity, httpOptions)
      .pipe(
        tap(resp => {
          // Use object assign to update the current object
          // NOTE: Don't create a new AppUserAuth object
          // because that destroys all references to object
          Object.assign(this.securityObject, resp);
          // Store into local storage
          localStorage.setItem("bearerToken", this.securityObject.bearerToken);
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;

    this.securityObject.claims = [];

    localStorage.removeItem("bearerToken");
  }



  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }
    return ret;
  }


  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true"
      }
      // Attempt to find the claim
      ret = auth.claims.find(c => c.claimType.toLowerCase() == claimType && c.claimValue == claimValue) != null;
    }
    return ret;
  }
}
