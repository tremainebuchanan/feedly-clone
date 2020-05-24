var express = require('express');
var router = express.Router();
const moment = require('moment');
//const PublicationCtrl = require('../controllers/publicationCtrl');
//const ArticleCtrl = require('../controllers/article/ctrl');
const Article = require('../models/db').Article;
require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient({
  password: process.env.REDIS_PASS
});

// router.route('/jamaica-gleaner')
// .get(PublicationCtrl.index)
// .post(PublicationCtrl.create);

router.get('/articles', async (req, res) => {
  Article
  .find({})
  .populate('publication_id')
  .sort('-retrieved_on')
  .exec((err, articles) => {
    res.render('index', { title: 'Front Pages | News Aggregator', articles: articles, moment: moment});
  }); 
});

// router.get('/jamaica-gleaner', function(req, res, next) {
//   // PublicationCtrl.index(req, res) => {}
//   redisClient.smembers('gleaner', (err, arr)=>{
//     let articles = [];
//     arr.forEach((ele) => {
//         articles.push(JSON.parse(ele));
//     });
//     res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
//   }) 
// });

// router.get('/jamaica-observer', function(req, res, next) {
//   redisClient.smembers('observer', (err, arr)=>{
//     let articles = [];
//     arr.forEach((ele) => {
//         articles.push(JSON.parse(ele));
//     });
//     res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
//   }) 
// });

module.exports = router;
