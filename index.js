var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            console.log("res.request.uri.path",res);
            if(res.request.uri.path.startsWith("/page")){
               console.log(res.request.uri);
               console.log("page",$("title").text());
               var detailsites= $("#content > div > div > h2 > a")
               .get()
               .map(item=>`${res.request.uri.protocol}//${res.request.uri.host}:${res.request.uri.port}${item.attribs.href}`)
               ;
               //detailsites.forEach(item=>console.log(item));
               //console.log(detailsites);
               c.queue(+ detailsites);
            } else {
                console.log("detail",$("title").text());
            }
        }
        done();
    }
});


// Queue just one URL, with default callback
for(let i=9000;i<9001;i++){
    c.queue(`http://audiobookbay.nl/page/${i}/`);
}

