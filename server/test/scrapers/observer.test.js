const timeout = 5000;
const observer = require('../../libs/scrapers/observer');

describe('Observer Scraper', () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://www.jamaicaobserver.com/latestnews/');
    }, timeout);

    it('should get articles', async () => {
      const html = await page.content();
      const articles = observer.getArticles(html);
      expect(articles.length).toBeGreaterThan(0);
    });
  },
  timeout,
);
