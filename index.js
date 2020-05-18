require('dotenv').config();
const puppeteer = require('puppeteer');
const scraper = require('./libs/scraper.js')
const publications = [
  {id: 1, title: 'gleaner', url: 'http://jamaica-gleaner.com/latest'},
  {id: 2, title: 'observer', url: 'http://www.jamaicaobserver.com/latestnews/'}
];
const cron = require('node-cron');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/frontpage', {useNewUrlParser: true, useUnifiedTopology: true});

// const Article = mongoose.model('Article', {
//   title: String,
//   link: String,
//   source: String
// });

let count = 0;
console.log('Script started');
cron.schedule("* * * * *", function() {
  console.log(`Starting scrape job for ${publications[count].title}`);
    //should cron job run?
    if(process.env.RUN === 'true'){
      start(publications[count]);
      if(count === (publications.length-1)) count = 0;
      else count++      
    }else{
      console.log('Cron service stopped');
    }    
});

const start = async (publication) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    let html;
    await page.goto(publication.url, {waitUntil: 'networkidle0'})
    html = await page.content()
    console.log(scraper.init(html, publication.id));    
    await browser.close();
}
