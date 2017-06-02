import { MycEnaPage } from './app.po';

describe('myc-ena App', () => {
  let page: MycEnaPage;

  beforeEach(() => {
    page = new MycEnaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
