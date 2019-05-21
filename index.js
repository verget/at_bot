const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let firstPageUrl = 'https://author.today/reader/18544/191253';
const urlArray = firstPageUrl.split('/');
const fs = require('fs');
let globalText = `
<?xml version="1.0" encoding="utf-8"?>
<FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:xlink="http://www.w3.org/1999/xlink">
<description><title-info><book-title>Книга из бота</book-title></title-info></description>`;

(async () => {
  const browser = await puppeteer.launch({
    slowMo: 1500
  });
  const page = await browser.newPage();
  // await page.setRequestInterception(true);
  // // add header for the navigation requests
  // page.on('request', request => {
  // // Do nothing in case of non-navigation requests.
  //   if (!request.isNavigationRequest()) {
  //     request.continue();
  //     return;
  //   }
  //   // Add a new header for navigation request.
  //   const headers = request.headers();
  //   headers['cookie'] = '__cfduid=d3d397942edfa8505fb793d8f45e44ceb1557617331; CSRFToken=d39krhr8Y7fDCUjravLMAAZF5mZG58nQn6YN7aWiES0NzFqQjnCVDyDa3OvHvMmBX7jAsegR0R47NXQ6yuK606KJQP81; _ga=GA1.2.556604642.1557617337; _ym_uid=155761733719114942; _ym_d=1557617337; ASP.NET_SessionId=zy1weo3ew5jg3ge32oi1b1zd; _gid=GA1.2.1044782648.1558242898; country_code=RU; _ym_isad=1; LoginCookie=-PqkczqfP6FORxBz234I57-o1ZjMhrUJltccp3AbymuF2bEV5pa8pCYNKkpkZHc3tUJwLgm7csQRTapwPPBnpjlrCo3Mzzxk_Yp_Sh-Kc7x_5lZ0_bSiijaK_6gZOqos_V_j4XF47K7B8U59fALMaDQuSA-0T9FcSsa8zVF-a9MuZC4alKgscEHAkoGcjfrv0FR8NYnMqBdugnj1Cp-kYXxRETCvmhlZqF0dBGPGiZJg8pLIMhIns_fxqS1qEDAIFNfOpQN-HE7gIFB3r358HYW3LlLJ-M8sEhc_1cPhh3TBROKrmqVLU7xbPiD2mqOoaGxrD9qse6GExCCtB5Y1ldGw7mvco1S8EbT4Nd7zgx7U4wpbWlfQNGzdSn4CmBVsHyv_jX9oIbviNuJI-k2_8DFQXqHxx9KYURiwcY_OSlx83U81H6_ABltCSgqw9hR3tcHbcaMwR52d-DNpzY7xbj8mzIu4b0Kg5LNGfMkjJEEE4jcVbuccqYP9eMlEAJoMM8VodDhau88vJsqOtJTae4Bms2_biIlBgnDnJGpU3Vao73rGXYwEHk4PkXaeXJFwomCrygM-1JXGb3O_m8ktrfA-qveZxaTiSfpJNxhMSmMlB5yk';
  //   request.continue({ headers });
  // });
  // const token = {
  //   name: 'CSRFToken',
  //   value: 'd39krhr8Y7fDCUjravLMAAZF5mZG58nQn6YN7aWiES0NzFqQjnCVDyDa3OvHvMmBX7jAsegR0R47NXQ6yuK606KJQP81',
  //   domain: 'N/A',
  //   url: 'N/A'
  // }
  // const login = {
  //   name: 'LoginCookie',
  //   value: '-PqkczqfP6FORxBz234I57-o1ZjMhrUJltccp3AbymuF2bEV5pa8pCYNKkpkZHc3tUJwLgm7csQRTapwPPBnpjlrCo3Mzzxk_Yp_Sh-Kc7x_5lZ0_bSiijaK_6gZOqos_V_j4XF47K7B8U59fALMaDQuSA-0T9FcSsa8zVF-a9MuZC4alKgscEHAkoGcjfrv0FR8NYnMqBdugnj1Cp-kYXxRETCvmhlZqF0dBGPGiZJg8pLIMhIns_fxqS1qEDAIFNfOpQN-HE7gIFB3r358HYW3LlLJ-M8sEhc_1cPhh3TBROKrmqVLU7xbPiD2mqOoaGxrD9qse6GExCCtB5Y1ldGw7mvco1S8EbT4Nd7zgx7U4wpbWlfQNGzdSn4CmBVsHyv_jX9oIbviNuJI-k2_8DFQXqHxx9KYURiwcY_OSlx83U81H6_ABltCSgqw9hR3tcHbcaMwR52d-DNpzY7xbj8mzIu4b0Kg5LNGfMkjJEEE4jcVbuccqYP9eMlEAJoMM8VodDhau88vJsqOtJTae4Bms2_biIlBgnDnJGpU3Vao73rGXYwEHk4PkXaeXJFwomCrygM-1JXGb3O_m8ktrfA-qveZxaTiSfpJNxhMSmMlB5yk',
  //   domain: 'N/A',
  //   url: 'N/A'
  // }

  // await page.setCookie(token, login);
  await page.setExtraHTTPHeaders({
    'cookie': '__cfduid=d3d397942edfa8505fb793d8f45e44ceb1557617331; CSRFToken=d39krhr8Y7fDCUjravLMAAZF5mZG58nQn6YN7aWiES0NzFqQjnCVDyDa3OvHvMmBX7jAsegR0R47NXQ6yuK606KJQP81; _ga=GA1.2.556604642.1557617337; _ym_uid=155761733719114942; _ym_d=1557617337; ASP.NET_SessionId=zy1weo3ew5jg3ge32oi1b1zd; _gid=GA1.2.1044782648.1558242898; country_code=RU; _ym_isad=1; LoginCookie=-PqkczqfP6FORxBz234I57-o1ZjMhrUJltccp3AbymuF2bEV5pa8pCYNKkpkZHc3tUJwLgm7csQRTapwPPBnpjlrCo3Mzzxk_Yp_Sh-Kc7x_5lZ0_bSiijaK_6gZOqos_V_j4XF47K7B8U59fALMaDQuSA-0T9FcSsa8zVF-a9MuZC4alKgscEHAkoGcjfrv0FR8NYnMqBdugnj1Cp-kYXxRETCvmhlZqF0dBGPGiZJg8pLIMhIns_fxqS1qEDAIFNfOpQN-HE7gIFB3r358HYW3LlLJ-M8sEhc_1cPhh3TBROKrmqVLU7xbPiD2mqOoaGxrD9qse6GExCCtB5Y1ldGw7mvco1S8EbT4Nd7zgx7U4wpbWlfQNGzdSn4CmBVsHyv_jX9oIbviNuJI-k2_8DFQXqHxx9KYURiwcY_OSlx83U81H6_ABltCSgqw9hR3tcHbcaMwR52d-DNpzY7xbj8mzIu4b0Kg5LNGfMkjJEEE4jcVbuccqYP9eMlEAJoMM8VodDhau88vJsqOtJTae4Bms2_biIlBgnDnJGpU3Vao73rGXYwEHk4PkXaeXJFwomCrygM-1JXGb3O_m8ktrfA-qveZxaTiSfpJNxhMSmMlB5yk'
  });
  // await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
  // page.on('request', request => console.log(`Request: ${request.resourceType}: ${request.url} (${JSON.stringify(request.headers)})`));
  let chapters = [];
  try {
    // chapters = await getChapters(page, firstPageUrl);
    chapters = [
      {id: '191253'},
      {id: '200641'}
    ];
    console.log(chapters);
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
  console.log(url);
  return renderPage(browserPage, url).then(html => {
    const $ = cheerio.load(html, {
      decodeEntities: false
    });
    const text = $('#text-container').html();
    console.log(text.substring(0, 100));
    globalText += text;
    return Promise.resolve();
  })
}
