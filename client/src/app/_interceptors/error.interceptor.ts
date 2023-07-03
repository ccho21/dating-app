import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof error.error === 'object') {
                // this._snackBar.open(error.statusText, 'Dismiss', {
                //   panelClass: ['red-snackbar'],
                //   duration: 5000,
                //   verticalPosition: 'bottom',
                //   horizontalPosition: 'right',
                // });
              } else {
                // this._snackBar.open(error.error, 'Dismiss', {
                //   panelClass: ['red-snackbar'],
                //   duration: 5000,
                //   verticalPosition: 'bottom',
                //   horizontalPosition: 'right',
                // });
              }
              break;
            case 401:
              // this._snackBar.open(error.statusText, 'Dismiss', {
              //   panelClass: ['red-snackbar'],
              //   duration: 5000,
              //   verticalPosition: 'bottom',
              //   horizontalPosition: 'right',
              // });
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              // this._snackBar.open(
              //   'Something unexpected went wrong',
              //   'Dismiss',
              //   {
              //     panelClass: ['red-snackbar'],
              //     duration: 5000,
              //     verticalPosition: 'bottom',
              //     horizontalPosition: 'right',
              //   }
              // );
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
