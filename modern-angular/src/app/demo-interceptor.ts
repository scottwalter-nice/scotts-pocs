import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const demoInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
    //  const userToken = 'MY_TOKEN'; const modifiedReq = req.clone({
    //    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    //  });

    console.log('demoInterceptor', req);

     return next(req);
  };