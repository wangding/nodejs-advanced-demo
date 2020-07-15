#!/usr/bin/env node

const axios = require('axios'),
      path  = require('path'),
      fs    = require('fs'),
      log   = console.log

async function getBookCover() {
  var files = fs.readdirSync('./data')
  var fileData, file, areaID, url, res, tip, i=1, j

  files.forEach(async(file) => {
    file = path.join(__dirname, 'data', file)
    log(`file: ${file}`)

    fileData = fs.readFileSync(file).toString('utf8')
    fileData = JSON.parse(fileData)
    fileData = fileData.UpdateComicItems
    
    fileData.forEach(async(book) =>{
      res = await axios({
        method: 'get',
        url: book.ShowConver,
        responseType: 'stream'
      });

      res.data.pipe(fs.createWriteStream(`./cover/${book.ID}.jpg`))
      
      log(`${i++}   ${book.Title.substr(0, 10)}\t${book.ShowConver}`)
    })
  })
}

getBookCover();
