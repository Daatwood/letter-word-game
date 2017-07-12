import { LetterWordsPage } from './app.po';

describe('letter-words App', () => {
  let page: LetterWordsPage;

  beforeEach(() => {
    page = new LetterWordsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
