var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var searchOptions = {
  url: 'https://mobile.freebasics.com/searchservices',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.122 Mobile Safari/537.36',
    'Cookie': 'datr=9wZ1Vt78KR-7hf2FRK0hl0nH',
  }
};

var addService = function(url, cb) {

    var options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.122 Mobile Safari/537.36',
            'Cookie': 'datr=9wZ1Vt78KR-7hf2FRK0hl0nH',
            'Referer': url.url
        },
        form: {
            'serviceid':url.id,
            'confirmed':'1',
            'submit':'Add'
        }

    }
    console.log(url);

    request.post(url.url, options, function(err,response,body){
           if ( err){
                 cb(err);
           } else {
                 cb(null, {'url': url.url, 'status': true }); // First param indicates error, null=> no error
           }
     });
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var data = [];

    $('li').each(function(i, elem) {
    var href = $(this).children('a').attr('href');
      data[i] = {
        'url': href,
        'id': href.substr(href.lastIndexOf("=")+1)
      }
    });
    //console.log(data);

    async.map(data, addService, function(err, results){
        console.log(results);
    });
  }
}

request(searchOptions, callback);