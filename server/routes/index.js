var express = require('express');
var router = express.Router();
require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient({
  password: process.env.REDIS_PASS
});

router.get('/', function(req, res, next) {
  let articles = [];
  redisClient.smembers('observer', (err, arr)=>{
    arr.forEach((ele) => {
        articles.push(JSON.parse(ele))
    })
    res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
  }) 
});

module.exports = router;
