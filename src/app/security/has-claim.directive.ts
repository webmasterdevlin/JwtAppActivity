import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from './security.service';

@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {
  @Input() set hasClaim(claimType: any) {
    if (this._securityService.hasClaim(claimType)) {
      // Add template to DOM
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      // Remove template from DOM
      this._viewContainer.clear();
    }
  }

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _securityService: SecurityService) { }

}
