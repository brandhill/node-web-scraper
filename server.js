var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var points = require('./apis/getPoint');
var router = express.Router();
var portNo = 8080;
app.use('/apis', points);


app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://www.imdb.com/title/tt1229340/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};

			$('.header').filter(function(){
		        var data = $(this);
		        title = data.children().first().text();
		        release = data.children().last().children().text();

		        json.title = title;
		        json.release = release;
	        })

	        $('.star-box-giga-star').filter(function(){
	        	var data = $(this);
	        	rating = data.text();

	        	json.rating = rating;
	        })
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
        res.json()
	})
})


app.get('/Lotto649', function(req, res){
    var url = 'http://www.taiwanlottery.com.tw/Lotto/Lotto649/history.aspx';

    request(url, function(error, response, html){

        var json = { no1 : ""
            , no2 : ""
            , no3 : ""
            , no4 : ""
            , no5 : ""
            , no6 : ""
            , no7 : ""};

        if(!error){
            var $ = cheerio.load(html);

            $('.Lotto649Control_history_dlQuery_SNo1_0').filter(function(){
                var data = $(this);
                json.no1 = data.text();
                console.log('get No1')
            })

            $('.Lotto649Control_history_dlQuery_SNo2_0').filter(function(){
                var data = $(this);
                json.no2 = data.text();
                console.log('get No2')
            })


            $('td_w').map(function(i, foo) {
                // the foo html element into a cheerio object (same pattern as jQuery)
                foo = $(foo)
                console.log(foo.text())
            })

            $('font_black14b_center').map(function(i, foo) {
                // the foo html element into a cheerio object (same pattern as jQuery)
                foo = $(foo)
                console.log(foo.text())
            })

        }else{
            var errMsg = 'something wrong with parse Lotto number';
            res.send(errMsg);
            console.log(errMsg);
        }

        fs.writeFile('Lotto649.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the Lotto649.json file');
        })

        //res.send('Check your console!');
        res.send(html);
    })
})



//app.get('/Lotto649', function(req, res){
app.get('/', function(req, res){

    // local file 測試
    fs.readFile('./lotto_sample.html', function (error, html) {
        if (error) {
            console.log('load file fail')
            throw error;
        }else{
            console.log('parse')
        }


        var json = { no1 : ""
            , no2 : ""
            , no3 : ""
            , no4 : ""
            , no5 : ""
            , no6 : ""
            , no7 : ""};

        if(!error){
            var $ = cheerio.load(html);

            $('.Lotto649Control_history_dlQuery_SNo1_0').filter(function(){
                var data = $(this);
                json.no1 = data.text();
                console.log('get No1')
            })

            $('.Lotto649Control_history_dlQuery_SNo2_0').filter(function(){
                var data = $(this);
                json.no2 = data.text();
                console.log('get No2')
            })


            $('td_w').map(function(i, foo) {
                // the foo html element into a cheerio object (same pattern as jQuery)
                foo = $(foo)
                console.log(foo.text())
            })

            $('font_black14b_center').map(function(i, foo) {
                // the foo html element into a cheerio object (same pattern as jQuery)
                foo = $(foo)
                console.log(foo.text())
            })

        }else{
            var errMsg = 'something wrong with parse Lotto number';
            res.send(errMsg);
            console.log(errMsg);
        }

        fs.writeFile('Lotto649.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the Lotto649.json file');
        })

        //res.send('Check your console!');
        //res.send(html);
    })
})


app.listen(portNo);
console.log('Magic happens on port '+portNo);
exports = module.exports = app; 	