import { PsfrontPage } from './app.po';

describe('psfront App', () => {
  let page: PsfrontPage;

  beforeEach(() => {
    page = new PsfrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
