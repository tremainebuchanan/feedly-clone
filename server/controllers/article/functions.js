const Article = require('../../models/db').Article;

exports.index = async () => {
    const articles = await Article.find({}).populate('publication_id');
    return articles;
}

exports.create = async (article) => {
    Article.findOne({'title': article.title}).exec((err, doc) => {
        if(!doc){
            const new_article = new Article(article);
            new_article.save((err)=> {
                if(err) console.log(err);
            })
        }
    });    
}