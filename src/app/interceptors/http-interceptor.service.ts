import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TokenService } from '@core/services/tokens/token.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req.clone({
      headers: req.headers.set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
    });

    request = this.addToken(request);

    return next.handle(request)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line: typedef
  private addToken(req: HttpRequest<any>) {
    const token = this.tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return req;
    }
    return req;
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage;

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
