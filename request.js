const axios = require('axios');

axios({
  url: 'https://author.today/reader/18544/chapter',
  method: 'get',
  params: {
    id: '226036',
    _: '1558442996389'
  },
  headers: {
    'cookie': '__cfduid=da17bde8d9862ac813441c663659740ea1530529534; ASP.NET_SessionId=1dyy0spnn5murvig1lupl3h4; CSRFToken=iR_i94fKuJ44XF85jmqeYOTlrFGgqPP6HLrwU11yuAb9vvNk5q63fF27JFDGoZMhjZACOZPgBIeuxbtIB374sAaDKLg1; _ym_uid=1530709900506567515; _ym_d=1530709900; .AspNet.Correlation.Vk=oPyFu0SzmU4cicmRapS71xWADj6K7Pa9cxU5wOpnUxA; country_code=RU; LoginCookie=pZgqo7GMatqdS26GPb1oNW-g8WKu0t46XNtvhZf9Z7xbTlj0QGXkIPq68jONtLFGB9B8jhvOp7lhKp_9tdo03p76SUVy_7RMUgzH3JwMS8SNhWIAuMXnvqmEbYXWPtv2z38OarIbIU05Or1sg_TfFEIvHgco2gP9vJedwnp_SAU-B1mDzMklPypNMSJ76Yf3YkDfZg44dh28VOL8Z99TVMhrDy8gkB9ei4O950ji_zUwGzNCtJvQEoUG5fbWcatcdUM7K4JfO0O3ut7pBUeMTF4Or_u1zc6BhD_WHbPwmIUAYzfTZm41z3-IlZ3VmYfIbOD0CFuuEkF6T1tMYUeaX5Gr0OeeD1OAMmAOxVvfrEWb4I4El5xcAq8mKZjJBqz-sGWXfqZ-RbxRVrszAJ_rO2SAaUmyLxNPKQwLatmCMzEk3mPaoiXoLN_Xqi5ZPyI340i2RzghTUlOLgagGDedpSqPlDwhO72XasqvFxWgC79E39OO4xx4qUqKhQe79V3bNDEFwV8H8mrA0g8Ky5WEn239THFQt1feoUes3OGDLBc3foM3i-MuAQrqPS4OU1KGlgeAtHWOqLK5-_e78VYkLnt8JYcH5qmXyHN0tikTjIjyCqCb',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  }
})
  .then(response => {
    console.log(response.data.data.text);
    console.log(decodeURIComponent(response.data.data.text));
    v = s.map(n.data.text, function(t, i) {
      return String.fromCharCode(n.data.text.charCodeAt(i) ^ o.charCodeAt(Math.floor(i % o.length)))
    }).join("")
  
    var l = e.getResponseHeader("Reader-Secret"), a = window.app.userId || "", o = l.split("").reverse().join("") + "@_@" + a, v = s.map(n.data.text, function(t, i) {
      return String.fromCharCode(n.data.text.charCodeAt(i) ^ o.charCodeAt(Math.floor(i % o.length)))
    }).join(""), h;
  })
  .catch(error => {
    console.log(error);
  });
