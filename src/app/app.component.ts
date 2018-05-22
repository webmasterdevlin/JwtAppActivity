import { Component } from "@angular/core";
import { AppUserAuth } from "./security/app-user-auth";
import { SecurityService } from "./security/security.service";

@Component({
  selector: "ptc-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title: string = "Acme Training Company";
  securityObject: AppUserAuth = null;
  constructor(private _securityService: SecurityService) {
    this.securityObject = _securityService.securityObject;
  }

  logout(): void {
    this._securityService.logout();
  }
}
