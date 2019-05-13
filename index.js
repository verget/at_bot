const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://author.today/reader/21513/153795';
const fs = require('fs');

puppeteer
  .launch()
  .then(browser => {
    return browser.newPage();
  })
  .then(page => {
    return parsePage(page, url)
  })
  .then(text => {
    fs.writeFile("./test.fb2", text, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    //handle error
    console.error(err);
  });

  function parsePage(browserPage, url) {
    return browserPage.goto(url).then(function() {
      return browserPage.content();
    }).then(function(html) {
      return Promise.resolve($('#text-container', html).text());
    })
  }