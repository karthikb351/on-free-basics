var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var jsonfile = require('jsonfile');

var options = {
  url: 'https://mobile.freebasics.com',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.122 Mobile Safari/537.36',
    'Cookie': 'datr=9wZ1Vt78KR-7hf2FRK0hl0nH',
  }
};

var categories = {
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yC/r/u63DvFoQHg4.png': "Facebook",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yC/r/AeQ6o2rbyKA.png': "Learning",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yP/r/Tv0y3HJKRYY.png': "News and Weather",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yo/r/ljUxWvTihiQ.png': "Communication",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yz/r/HIAhJP1GkwP.png': "Health and Safety",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yb/r/2z7NYDPyHiE.png': "Jobs",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yq/r/qOR4Nn9edP4.png': "Women and Girls",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yi/r/V5CbqGBIY7J.png': "Sports and Entertainment",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yL/r/wb7IvTMiURq.png': "Finance",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yl/r/eV_WsHcr2a-.png': "Buy and Sell",
    'https://m.ak.fbcdn.net/static.ak/rsrc.php/v2/yX/r/HL-92LfMQTg.png': "Facebook Messenger"
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var data = [];
    $('li').each(function(i, elem) {
        var url = $(this).children('a').attr('href');
        var desc = $(this).children('a').children('div').text();
        var category = categories[$(this).children('a').children('img').attr('src')];
        var name = $(this).children('a').text().substring(0,($(this).children('a').text().length-desc.length));
        data[i] = {
        'name': name,
        'description': desc,
        'category': category,
        'url': url,
        }
    });
    var file = 'src/api/freebasics.json';

    jsonfile.writeFileSync(file, { 'data': data });
  }
}

request(options, callback);