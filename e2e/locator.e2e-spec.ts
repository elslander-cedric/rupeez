import { LocatorPage } from './locator.po';

describe('Locator', () => {
  let page: LocatorPage;

  beforeEach(() => {
    page = new LocatorPage();
  });

  it('should display a map', () => {
    page.navigateTo();
    expect(page.getMap()).toBeTruthy();
  });

  xit('should recenter when a marker is clicked', () => {
    // TODO-FIXME
  });
});
