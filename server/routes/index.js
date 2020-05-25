const express = require('express');
const router = express.Router();
const moment = require('moment');
const Article = require('../models/db').Article;

router.get('/articles', async (req, res) => {
  Article
  .find({})
  .populate('publication_id')
  .sort('-retrieved_on')
  .exec((err, articles) => {
    if(err) return res.render('index', { title: 'Front Page | News Aggregator', articles: []});
    res.render('index', { title: 'Front Page | News Aggregator', articles: articles.reverse(), moment: moment});
  }); 
});

module.exports = router;
