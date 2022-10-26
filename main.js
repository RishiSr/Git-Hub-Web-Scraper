const cheerio = require("cheerio");
const request = require("request");
const getrepos = require("./repos");
let url = 'https://github.com/topics'
request(url, (err, response, html) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(html)
        getTopicslink(html);

    }
})



function getTopicslink(html) {

    let $ = cheerio.load(html);
    let htmllink = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for (let i = 0; i < htmllink.length; i++) {

        let href = $(htmllink[i]).attr("href");
        let topic = href.split("/").pop();

        let fulllink = `https://github.com/${href}`;
        getrepos(fulllink, topic);
    }
}