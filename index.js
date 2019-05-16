const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let url = 'https://author.today/reader/21513/153798';
const fs = require('fs');
let text = '';

puppeteer
  .launch()
  .then(browser => {
    return browser.newPage();
  })
  .then(page => {
    const urlArray = url.split('/');
    let pageNumber = urlArray.slice(-1)[0] * 1;
    const promises = [];
    while(pageNumber < 153800) {
      urlArray[urlArray.length - 1] = ++pageNumber;
      url = urlArray.join('/');
      console.log(url);
      promises.push(parsePage(page, url));
    }
    return promiseSerial(promises);
  })
  .then( _ => {
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
  console.log(url);
  // setTimeout(() => {
    return browserPage.goto(url).then(function() {
      return browserPage.content();
    }).then(html => {
      const $ = cheerio.load(html, {
        decodeEntities: false
      });
      console.log('****************************************', $('#text-container').html());
      text += '======================================================================='
      text += $('#text-container').html();
      return Promise.resolve();
    })
  // }, 2000)
}

function promiseSerial(tasks) {
  return tasks.reduce((promiseChain, currentTask) => {
    return promiseChain.then(chainResults =>
      currentTask.then(currentResult =>
        [ ...chainResults, currentResult ]
      )
    );
  }, Promise.resolve([])).then(arrayOfResults => {
      return arrayOfResults;
  });
}
