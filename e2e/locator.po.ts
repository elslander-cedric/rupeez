import { browser, by, element } from 'protractor';

export class LocatorPage {
  navigateTo() {
    return browser.get('/locator');
  }

  getMap() {
    return element(by.css('.map'));
  }
}
