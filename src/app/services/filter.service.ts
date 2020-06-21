import { AuthService } from 'src/app/services/auth.service';
import { HttpReponse } from './../models/response/http-reponse';
import { ActionToken } from './../config/action-token';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService implements HttpInterceptor {
  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
          Authorization: "Bearer " + ActionToken.getToken
      }
    });

    return next.handle(req);
  }
}
