const cheerio = require('cheerio');

module.exports = {
    $: "",

    getArticles: function(html){
        this.$ = cheerio.load(html)
        let details = this.getColumnOneArticles();
        return this.buildArticles(details);
    },

    getArticle: function (html){
        this.$ = cheerio.load(html);
        let storyChildren;
        let article = "";
        const news = this.$('#news_articles_section').children();
        this.$(news).each((i, ele) => {
            if(this.$(ele)[0].attribs.id === 'story'){
                this.$(ele).children().each((i, e) => {
                    if(this.$(e)[0].attribs.id === 'story'){
                        storyChildren = this.$(e)[0]
                    }
                })
            }
        })
        this.$(storyChildren).children().each((i, element) => {
            if(this.$(element)[0].name === 'p'){
                if(this.$(element)[0].children.length  > 0 && this.$(element)[0].children[0].data && this.$(element)[0].children[0].data.indexOf(' ') >= 0 ){
                    article += this.$(element)[0].children[0].data.trim()                
                }
            }
        })
        return article;
    },

    getColumnOneArticles: function (){
        let links = [];         
        let titles = [];
        let blurbs = [];

        this.$('#ac1').each((i, el)=>{
            let obj = this.$(el).children();
            links.push(obj[0].children[0].attribs.href);
            titles.push(obj[0].children[0].children[0].data);
            blurbs.push(obj[0].children[0].children[0].data);
        });

        this.$('#ac2').each((i, el)=>{
            //list contains the children of the ac2 div
            const list = this.$(el).children();
        
            for(let i = 0; i < list.length; i++){              
                
                if(list[i].name === 'p' 
                   && list[i].attribs.class !== 'line'
                   && list[i].children.length > 1){ 
                    let article = {
                        link: '',
                        blurb: '',
                        title: '',
                    };
                    const listChildren = list[i].children;
                    for(let j =0; j < listChildren.length; j++){

        
                        if(listChildren[j].type === 'tag'){
                            //console.log(listChildren[j].name)
                            if(listChildren[j].name === 'a'){
                                if(listChildren[j].attribs.class === undefined){
                                    links.push(listChildren[j].attribs.href)
                                }
                                if(listChildren[j].attribs.class === 'spec'){
                                    titles.push(listChildren[j].children[0].data.trim())
                                }
                            }                   
                        }
        
                        if(listChildren[j].type === 'text'){
                            let data = listChildren[j].data.trim(); 
                            if( data !== ''){
                                blurbs.push(data);
                            }                         
                        }
                    }
                     
                }
               
            }
            
            // walk through the list of paragraphs
            // discard the items that have a class of line
            // discard the items that have only one child
        })
        let divs = [];
        this.$('#inside_ac1').each((i, el)=>{
            divs.push(this.$(el).children())
        }); 
        for(let k = 0; k < divs.length; k++){
            blurbs.push(divs[k][3].children[0].data);
            titles.push(divs[k][0].children[0].children[0].data.trim())
            links.push(divs[k][0].children[0].children[0].parent.attribs.href)
        }

        return{
            blurbs,
            titles,
            links
        }     
    },

    buildArticles: function (details) {
        //TODO check the lengths of each array
        let articles = []
        for(let i = 0; i < details.titles.length; i++){
            let article = {
                title: details.titles[i],
                blurb: details.blurbs[i],
                link: details.links[i],
                //retrievedOn: Date.now(),
                source: 'Jamaica Observer'
            }
            articles.push(article);
        }
        return articles;
       
    },
}