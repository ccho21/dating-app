import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileEditComponent } from '../profile/profile-edit/profile-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {}

  canDeactivate(
    component: ProfileEditComponent
  ): Observable<boolean> | boolean {
    if (component && component.editForm?.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
}
