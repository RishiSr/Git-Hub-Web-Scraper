const request = require('request');
const cheerio = require('cheerio');
const getissues = require('./getissues');
function getrepos(url, topic) {
    request(url, (err, response, html) => {
        if (err) {
            console.log(err);

        }
        else {
            getreposlink(html, topic);
        }
    })
}


function getreposlink(html, topic) {
    let $ = cheerio.load(html);
    let linksarr = $('.f3.color-fg-muted.text-normal.lh-condensed')
    for (let i = 0; i < 10; i++) {
        let issuelink = $(linksarr[i]).find('a');
        let link = $(issuelink[1]).attr('href');
        let fulllink = `https://github.com${link}/issues`;
        let repo = link.split("/").pop();

        getissues(fulllink, repo, topic);


    }
    console.log("-----")
}
module.exports = getrepos;