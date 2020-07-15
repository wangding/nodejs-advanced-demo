#!/usr/bin/env node

const axios = require('axios'),
      cheerio = require('cheerio'),
      path  = require('path'),
      fs    = require('fs'),
      baseURL = 'http://www.dm5.com/',
      log   = console.log

function getBookData() {
  var files = fs.readdirSync('./data')
  var fileData, file, areaID, url, res, tip, tag, i=1, j

  files.forEach((file) => {
    file = path.join(__dirname, 'data', file)
    log(`file: ${file}`)

    fileData = fs.readFileSync(file).toString('utf8')
    fileData = JSON.parse(fileData)
    fileData = fileData.UpdateComicItems
    
    fileData.forEach(async(book) =>{
      url = baseURL + book.UrlKey + '/'
      res = await axios.get(url)
      res = res.data

      var $ = cheerio.load(res)
      tip = $('body').find('.tip>.block')
      summary = $('body').find('.info>.content')
      tag = $(tip[1]).text().split(' ').filter(item => item !== '')
      tag.shift()

      log(`${i++}   ${book.Title.substr(0, 10)}\t${url}`)
      log($(tip[0]).text())
      log(`分类：${tag.join('|')}`)
      
      log('简介：' + summary.text().substr(0, 30))
      log('')
    })
  })
}

getBookData();
