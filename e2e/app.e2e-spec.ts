import { WsChatAppPage } from './app.po';

describe('ws-chat-app App', function() {
  let page: WsChatAppPage;

  beforeEach(() => {
    page = new WsChatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ws works!');
  });
});
