const cheerio = require('cheerio');

module.exports = {
    $: "",
    articles: [],
    source: 'Jamaica Gleaner',
    targets: ['div.view-display-id-page', 'div.view-display-id-block_3'],

    getArticles: function(html){        
        this.$ = cheerio.load(html);
        this.parsePage();
        return this.articles;
    },

    parsePage: function(){
        this.articles.push(this.getViewHeader());
        this.articles.push(this.retrieveArticleFromDiv(1));
        this.articles.push(this.retrieveArticleFromDiv(3));
        this.getFooter()
    },
 
    retrieveArticleFromDiv: function (divPosition){
        const data = this.$(this.targets[0]).children()[1].children[divPosition];
        return this.extractArticleFromDiv(data);
        // return {
        //     title: data.children[3].children[1].children[0].children[0].data.trim(),
        //     link : data.children[3].children[1].children[0].attribs.href,
        //     blurb: data.children[5].children[1].children[0].data.trim(),
        //     source: this.source,
        // }
    },

    getViewHeader: function(){
        const targetDiv = this.$(this.targets[0]);
        const data = this.$(targetDiv).children().children()[0].children[1].children[1];
        return {
            title: data.children[3].children[1].children[0].children[0].data.children,
            link : data.children[3].children[1].children[0].attribs.href,
            blurb: data.children[5].children[1].children[0].data.trim(),
            source: this.source
        }  
    },

    getFooter: function (){
        const targetDiv = this.$(this.targets[1]);
        const viewContentChildren = targetDiv.children()[0].children;
        const divs = viewContentChildren.filter(child => child.name === 'div');
        divs.forEach(div => {
            this.articles.push(this.extractArticleFromDiv(div));
            // this.articles.push({
            //     title: div.children[3].children[1].children[0].children[0].data.trim(),
            //     link: div.children[3].children[1].children[0].attribs.href,
            //     blurb: div.children[5].children[1].children[0].data.trim(),
            //     source: this.source
            // });
        });
    },

    extractArticleFromDiv: function (data){
        return {
            title: data.children[3].children[1].children[0].children[0].data.trim(),
            link : data.children[3].children[1].children[0].attribs.href,
            blurb: data.children[5].children[1].children[0].data.trim(),
            source: this.source,
        }
    }

}