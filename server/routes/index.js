var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/frontpage', {useNewUrlParser: true, useUnifiedTopology: true});
const Article = mongoose.model('Article', {
  title: String,
  link: String,
  source: String
});
router.get('/', function(req, res, next) {
  Article.find({}).exec(function(err, articles){
    res.render('index', { title: 'Front Pages | News Aggregator', articles: articles});
  })
  
});

module.exports = router;
