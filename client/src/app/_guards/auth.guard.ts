import { CanActivateFn } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class AuthGuard {
  constructor(private accountService: AccountService, private toastr: ToastrService){  }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        else {
          this.toastr.error('Please LogIn or Register before accessing the URL!');
          return false;
        }
      })
    );
  }
  canMatch(): boolean {
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};
