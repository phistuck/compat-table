// run `npm install` to install deps first, then `node ./` to execute

var fs = require('fs')
  , chalk = require('chalk')
  , path = require('path')
  , cheerio = require('cheerio')

  , page = fs.readFileSync(path.join(__dirname, 'es6', 'index.html')).toString().replace(/data-source="[^"]*"/g,'')
  , $ = cheerio.load(page)

global.__script_executed = {};

$('#body tbody tr').each(function () {
  if (this.find('.separator')[0])
    return
  var desc = this.find('td>span:first-child').text()
    , scripts = this.find('script')
    , result = null
    , i = 0, scr
    , test = function test (expression) {
        result = result || expression
      }

  // can be multiple scripts
  for (; scripts[i] && scripts[i].children && scripts[i].children.length; i++) {
    scr = scripts[i].children[0].data.trim()
    eval(scr)
  }
  if (result === null) {
    console.log('\u25BC\t' + desc.replace('§',''))
  }
  else {
    console.log(chalk[result ? 'green' : 'red']((result ? '\u2714' : '\u2718') + '\t' + (desc[0]!== '§' ? '\t' + desc : desc.slice(1)) + '\t'))
  }
})
