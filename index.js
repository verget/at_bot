const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let url = 'https://author.today/reader/21513/153798';
const fs = require('fs');
let text = '';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urlArray = url.split('/');
  let pageNumber = urlArray.slice(-1)[0] * 1;
  for (let i = pageNumber; i < 153800; i++) {
    console.log(i);
    urlArray[urlArray.length - 1] = ++pageNumber;
    url = urlArray.join('/');
    await parsePage(page, url);
  }
  fs.writeFile("./test.fb2", text, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
})();

function parsePage(browserPage, url) {
  return browserPage.goto(url).then(function() {
    return browserPage.content();
  }).then(html => {
    const $ = cheerio.load(html, {
      decodeEntities: false
    });
    text += '=======================================================================';
    text += $('#text-container').html();
    return Promise.resolve();
  })
}
