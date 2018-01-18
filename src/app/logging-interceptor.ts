import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

export class LoggingInterceptor implements HttpInterceptor {
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
