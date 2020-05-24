const gleaner = require('./scrapers/gleaner.js');
const observer = require('./scrapers/observer');
module.exports = {
    
    init: function(html, publicationId){
        let articles = "";
        if(publicationId === 1){
            articles = gleaner.getArticles(html);
        }else{
            articles = observer.getArticles(html);
        }
        return articles;
    } 
}


