import { browser, element, by } from 'protractor';

export class WsChatAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ws-root h1')).getText();
  }
}
