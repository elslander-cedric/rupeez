import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from '@rupeez/app-routing.module';
import { AppComponent } from '@rupeez/app.component';
import { LocatorMockService } from '@rupeez/locator-mock.service';
import { LocatorService } from '@rupeez/locator.service';
import { LocatorComponent } from '@rupeez/locator/locator.component';

import { environment } from '../environments/environment';
import { LoggingInterceptor } from './logging-interceptor';
import { BrowserNativeService } from '@rupeez/browser-native.service';
import { GoogleMapsService } from '@rupeez/google-maps.service';

@NgModule({
  declarations: [
    AppComponent,
    LocatorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }), // TODO: need to fine tune sw
    RouterModule
  ],
  providers: [
    GoogleMapsService,
    BrowserNativeService,
    {
      provide: 'LocationProvider',
      useClass: environment.location ? LocatorService : LocatorMockService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
