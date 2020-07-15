#!/usr/bin/env node

const axios = require('axios'),
      qs    = require('querystring'),
      path  = require('path'),
      fs    = require('fs'),
      log   = console.log,
      url   = 'http://www.dm5.com/dm5.ashx?t=1594727583098',
      body  = {
        pagesize: 68,
        pageindex: 1,
        tagid: 0,
        areaid: 0,
        status: 0,
        usergroup: 0,
        pay: -1,
        sort: 10,
        char: '',
        sort: 10,
        action: 'getclasscomics'
      },
      total = 3; /* 410 */

async function getPage(page) {
  body.pageindex = page

  var rs = await axios.post(url, qs.stringify(body))
  return rs.data
}

async function getAllData() {
  var filename = ''
      data = ''

  for(var i=1; i<=total; i++) {
    filename = path.join(__dirname, 'data', 'book-' + i + '.json')
    data = JSON.stringify(await getPage(i))

    //log('filename:', filename)
    //log('data:', data)
    fs.writeFileSync(filename, data)
  }
}

getAllData()
