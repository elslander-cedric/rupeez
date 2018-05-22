import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * HTTP Interceptor for Logging
 */
export class LoggingInterceptor implements HttpInterceptor {
    /**
     * Intercept HTTP exchange
     *
     * @param req request
     * @param next handover function to call the next handler in the interceptorchain
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // REMARK: request & response objects are immutable

        console.log(`♦♢◊♢♦ [${req.method}] ${req.url}`);
        return next
            .handle(req)
            .pipe(
            map(event => {
                if (event.type === HttpEventType.Response) {
                    const res = event;
                    console.log(`♦♢◊♢♦ ${res.url} (${res.status} ${res.statusText})`);
                }

                return event;
            }));
    }
}
