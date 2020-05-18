const cheerio = require('cheerio');

module.exports = {
    $: "",
    articles: [],

    getArticles: function(html){        
        this.$ = cheerio.load(html);
        this.parsePage();
        return this.articles;
    },

    parsePage: function(){
        this.articles.push(this.getViewHeader());
        this.articles.push(this.getRowFirst());
        this.articles.push(this.getRowLast());
        this.getFooter()
    },

    getViewHeader: function(){
        const children = this.$('div.view-display-id-page');
        const viewHeader = this.$(children).children()
        const requiredData = this.$(viewHeader).children()[0].children[1].children[1].children;
        const link = requiredData[3].children[1].children[0].attribs.href;
        const title = requiredData[3].children[1].children[0].children[0].data;
        const blurb = requiredData[5].children[1].children[0].data.trim();
        return {
            title,
            link,
            blurb,
            source: 'Jamaica Gleaner'
        }  
    },

    getRowFirst: function() {
        const targetDiv = this.$('div.view-display-id-page');
        const viewContentDiv = this.$(targetDiv).children()[1];
        const rowFirst = viewContentDiv.children[1];
        const title = rowFirst.children[3].children[1].children[0].children[0].data.trim();
        const link = rowFirst.children[3].children[1].children[0].attribs.href;
        const blurb = rowFirst.children[5].children[1].children[0].data.trim();
        return {
            title,
            link,
            blurb,
            source: 'Jamaica Gleaner'
        }  
    },

    getRowLast: function(){        
        const targetDiv = this.$('div.view-display-id-page');
        const viewContentDiv = this.$(targetDiv).children()[1];
        const rowLast = viewContentDiv.children[3]
        const title = rowLast.children[3].children[1].children[0].children[0].data.trim();
        const link = rowLast.children[3].children[1].children[0].attribs.href;
        const blurb = rowLast.children[5].children[1].children[0].data.trim();
        return {
            title,
            link,
            blurb,
            source: 'Jamaica Gleaner'
        }       
    },

    getFooter: function (){
        const targetDiv = this.$('div.view-display-id-block_3');
        const viewContentChildren = targetDiv.children()[0].children;
        let divs = []
        for(let i = 0; i < viewContentChildren.length; i++){
            if(viewContentChildren[i].name === 'div'){
                divs.push(viewContentChildren[i])
            }
        }       
        for(let j = 0; j < divs.length; j++){
            let article = {
                title: '',
                link: '',
                blurb: '',
                source: 'Jamaica Gleaner'
            }
            article.title = divs[j].children[3].children[1].children[0].children[0].data.trim()
            article.link = divs[j].children[3].children[1].children[0].attribs.href
            article.blurb = divs[j].children[5].children[1].children[0].data.trim()
            this.articles.push(article)
        } 
    }


}