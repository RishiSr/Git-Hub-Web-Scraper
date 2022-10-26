const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const pdf = require('pdfkit');

function getissues(url, repo, topic) {
    request(url, (err, response, html) => {
        if (err) {
            console.log(err);

        }
        else {

            getissueslink(html, repo, topic);
        }
    })

}


let arr = [];
function getissueslink(html, repo, topic) {
    let $ = cheerio.load(html);
    let anchorarr = $('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
    console.log(repo)
    let pdffile = new pdf;
    let folder = path.join(__dirname, "Document");
    validfolder(folder);
    pdffile.pipe(fs.createWriteStream(path.join(folder, topic + '.pdf')));
    for (i = 0; i < anchorarr.length; i++) {
        let desc = $(anchorarr[i]).text();
        let link = $(anchorarr[i]).attr('href');
        let fulllink = `https://github.com${link}`;
        let str = "Description : " + desc + "\n Link : " + fulllink + "\n";
        pdffile.text("Description : " + desc + "\n ");
        pdffile.text("Link : " + fulllink + "\n", { link: fulllink, underline: true });

        pdffile.text("\n");

    }


    pdffile.end();
}
function validfolder(folder) {
    if (fs.existsSync(folder) == false) {
        fs.mkdirSync(folder);
    }
}
module.exports = getissues;