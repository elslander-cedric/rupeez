import { LocatorPage } from './locator.po';
import { element } from 'protractor';

describe('Locator', () => {
  let page: LocatorPage;

  beforeEach(() => {
    page = new LocatorPage();
  });

  it('should display a map', () => {
    page.navigateTo();
    expect(page.getMap()).toBeTruthy();
  });

  it('should recenter when a marker is clicked', () => {
    // TODO-FIXME
  });
});
