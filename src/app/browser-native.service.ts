import { Injectable } from '@angular/core';

@Injectable()
export class BrowserNativeService {

  constructor() { }

  public getNativeWindow(): any {
    return window;
  }

  public getNativeDocument(): any {
    return document;
  }
}
