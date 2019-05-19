const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let firstPageUrl = 'https://author.today/reader/21513/152034';
const urlArray = firstPageUrl.split('/');
const fs = require('fs');
let globalText = `
<?xml version="1.0" encoding="utf-8"?>
<FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:xlink="http://www.w3.org/1999/xlink">
<description><title-info><book-title>Книга из бота</book-title></title-info></description>`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let chapters = [];
  try {
    chapters = await getChapters(page, firstPageUrl);
  } catch (e) {
    console.error('no chapters found');
    return;
  }
  let url = '';
  for (let i = 0; i < chapters.length; i++) {
    urlArray[urlArray.length - 1] = chapters[i].id;
    url = urlArray.join('/');
    try {
      await parsePage(page, url);
    } catch(e) {
      console.log(e);
      break;
    }
  }
  fs.writeFile("./test.fb2", globalText, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
})();

function renderPage(browserPage, url) {
  return browserPage.goto(url).then( _ => browserPage.content())
}

function getChapters(browserPage, url) {
  return renderPage(browserPage, url).then(html => {
    let chaptersStr = html.match(/^.*chapters:\s*\[(.*)],$/gm)[0];
    if (chaptersStr) {
      chaptersStr = chaptersStr.substring(22, chaptersStr.length - 1);
      let chaptersArray = JSON.parse(chaptersStr);
      if (chaptersArray && chaptersArray.length) {
        return Promise.resolve(chaptersArray);
      }
      return Promise.reject();
    }
  })
}

function parsePage(browserPage, url) {
  return renderPage(browserPage, url).then(html => {
    const $ = cheerio.load(html, {
      decodeEntities: false
    });
    const text = $('#text-container').html();
    globalText += text;
    return Promise.resolve();
  })
}
