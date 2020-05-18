const gleaner = require('../libs/apis/gleaner.js');
const observer = require('../libs/apis/observer');
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


