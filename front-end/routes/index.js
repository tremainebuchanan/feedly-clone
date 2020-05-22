var express = require('express');
var router = express.Router();
require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient({
  password: process.env.REDIS_PASS
});

router.get('/jamaica-gleaner', function(req, res, next) {
  redisClient.smembers('gleaner', (err, arr)=>{
    let articles = [];
    arr.forEach((ele) => {
        articles.push(JSON.parse(ele));
    });
    res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
  }) 
});

router.get('/jamaica-observer', function(req, res, next) {
  redisClient.smembers('observer', (err, arr)=>{
    let articles = [];
    arr.forEach((ele) => {
        articles.push(JSON.parse(ele));
    });
    res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
  }) 
});

module.exports = router;
