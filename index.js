require('dotenv').config();
const puppeteer = require('puppeteer');
const scraper = require('./libs/scraper.js');
const redis = require('redis');
const ping = require('./libs/utils/ping');
const redisClient = redis.createClient({
  password: process.env.REDIS_PASS
});
const publications = [
  {id: 1, title: 'gleaner', url: 'http://jamaica-gleaner.com/latest'},
  {id: 2, title: 'observer', url: 'http://www.jamaicaobserver.com/latestnews/'}
];
const cron = require('node-cron');

redisClient.on('connect', () => {
  console.log('Connected to redis server');
});

redisClient.on('error', (err) => {
  console.log('Error while connecting to redis server', err);
});

let count = 0;
console.log('Script started');
cron.schedule("*/2 * * * *", function() {
  console.log(`Starting scrape job for ${publications[count].title}`);
    ping(publications[count].url, (error, code) => {
      if(process.env.RUN === 'true' && code === 200){
        console.log(`${publications[count].url} was successfully pinged.`);
        start(publications[count]);
        if(count === (publications.length-1)) count = 0;
        else count++      
      }else{
        console.log(`${error} received for ${publications[count].url}`);
      } 
    });      
});

const start = async (publication) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    let html;
    await page.goto(publication.url, {waitUntil: 'networkidle0'})
    html = await page.content()
    const articles = scraper.init(html, publication.id);   
    await browser.close();
    insert(articles, publication.title);
}

const insert = (articles, publication) =>{
  articles.forEach((article) => {
    const articleToString = JSON.stringify(article)
    redisClient.sadd(publication, articleToString, (err, res) => {
      if(err){
        console.log(err)
        throw err
      }
      console.log(res)
    });
  });
}



