import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService, private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add any validation or authentication logic here

        return this.accountService.currentUser$.pipe(
            take(1),
            switchMap((user: User | null) => {
                let token: string;

                if (user) {
                    token = user.token;
                    console.log(token);
                    // add Authorization header in request
                    const modifiedRequest = request.clone({
                        headers: request.headers.set('Authorization', 'Bearer ' + token)
                    });
                    return next.handle(modifiedRequest);
                } else {
                    // If user is not logged in, proceed with the original request
                    return next.handle(request);
                }
            })
        );
    }
}
