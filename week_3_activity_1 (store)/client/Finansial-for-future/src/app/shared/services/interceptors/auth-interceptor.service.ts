import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { InterceptorSkip } from './auth-skip';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.headers && req.headers.has(InterceptorSkip)) {
      const headers = req.headers.delete(InterceptorSkip);
      return next.handle(req.clone({ headers }));
    }
    console.log('not skipping');

    const authToken = this.localStorageService.getData() || '';
    if(!authToken) { this.router.navigateByUrl('/login'); }

    const authReq = req.clone({ 
      headers: req.headers.set('bearer', authToken._token)
    })

    return next.handle(authReq);
  }
}
