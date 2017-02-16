import { RxPowerPage } from './app.po';

describe('rx-power App', function() {
  let page: RxPowerPage;

  beforeEach(() => {
    page = new RxPowerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
