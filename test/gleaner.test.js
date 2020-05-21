const timeout = 5000;
const gleaner = require('../libs/scrapers/gleaner');

describe('Gleaner Scraper', () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://jamaica-gleaner.com/latest');
    }, timeout);

    it('should get articles', async () => {
      const html = await page.content();
      const articles = gleaner.getArticles(html);
      expect(articles.length).toBeGreaterThan(0);
    });
  },
  timeout,
);
