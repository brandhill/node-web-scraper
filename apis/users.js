/**
 * Created by Shih-Wei on 2015-06-09.
 */


var express = require('express');
var router = express.Router();
var url = require('url');
var mongoose = require('mongoose');

var querystring = require('querystring');
var request = require('request');

var unirest = require('unirest');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    accountType: Number, // email or Facebook or ....
    updateDate: {type: Date, default: Date.now},
    createDate: Date,
    isActive: Boolean
});


router.route('/users')
    .get(function (req, res) {
        res.json({
            message: 'give you all users'
        })
    });


router.route('/users/logout')
    .get(function (req, res) {

        res.json({
            message: 'not implement yet'
        })
    });


router.route('/users/:id/points')
    .get(function (req, res) {

        res.json({
            message: 'not implement yet'
        })

    })
    .post(function (req, res) {


        res.json({
            message: 'not implement yet'
        })


    })
    .delete(function (req, res) {


        res.json({
            message: 'not implement yet'
        })

    });


router.route('/users/is_email_used')
    .get(function (req, res) {

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        console.log('query :', query);

        if (query.email) {
            checkUserAccountValid(query.email);
        }

        res.json({
            message: 'not implement yet'
        })

    });



router.route('/users/:id')
    .get(function (req, res) {

        if(!req.params.id){
            res.status(400);
            res.json({
                message: 'invalid params'
            })
            return;
        }

        var User = mongoose.model('User', userSchema);
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log('query :', query);

        if (query.name) {
            User.find({name: query.name}, function (err, docs) {
                if (err) {
                    res.json({message: 'error ...'});
                } else {
                    if (docs) {
                        console.log('query :123');
                        res.json(docs);
                    } else {
                        res.json({message: 'not found ...'});
                    }
                }

            });
        } else {

            console.log('query :', query);
            res.json({
                message: 'invalid params'
            })
        }
    })

    .post(function (req, res) {

        if(!isNumeric(req.params.id)){
            res.status(400);
            res.json({
                message: 'bad request'
            })
            return;
        }else{
            console.log('req.params.id : ', req.params.id);
        }

        //console.log('req : ', req);

        var User = mongoose.model('User', userSchema);

        var arvind = new User({
            name: 'Arvind',
            age: 99,
            DOB: '01/01/1915',
            isAlive: true
        });

        arvind.save(function (err, data) {
            if (err) {
                console.log(err);
                returnRes(res, {
                    message: 'fail to save'
                });
            }
            else {
                console.log('Saved ');
                returnRes(res, {
                    message: 'saved'
                });
            }
        });

    })

    .put(function (req, res) {

        res.json({
            id: req.params.id,
            message: 'The put api for image: ' + req.params.id
        })
    })

    .delete(function (req, res) {

        var User = mongoose.model('User', userSchema);
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log('query :', query);

        if (query.name) {
            User.remove({name: query.name}, function (err) {
                if (err) {
                    res.json({
                        id: req.params.id,
                        message: 'delete fail ' + req.params.id
                    })
                } else {
                    res.json({
                        id: req.params.id,
                        message: 'delete successful ' + req.params.id
                    })
                }
            });

        } else {
            res.json({
                id: req.params.id,
                message: 'not found: ' + req.params.id
            })
        }


    });


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkIsExist(callback) {

    db.collection('contact', function (err, collection) {
        /* Querying */
        collection.find({name: 'David'}, function (err, data) {
            /* Found this People */
            if (data) {
                callback(true);
                console.log('Found');
            } else {
                callback(false);
                console.log('Cannot found');
            }
        });
    });
}

function returnRes(res, content) {
    res.json(content);
}

function isHeaderValid(req) {
    return req.headers['authorization'] ? true : false;
}


function checkUserAccountValid(email) {

    console.log('query para :', email);

    //// Build the post string from an object
    //var data = querystring.stringify({
    //    'email' : email
    //});
    //
    //// An object of options to indicate where to post to
    //var options = {
    //    host: 'mappingbird.com',
    //    port: '80',
    //    path: '/api/points/10',
    //    method: 'GET',
    //    headers: {
    //        'Authorization': '35f325cdf32f2b203cacf8346c4e4c787d7668fc'
    //    }
    //};
    //
    //// Set up the request
    //var post_req = http.request(options, function(res) {
    //    res.setEncoding('utf8');
    //    res.on('data', function (chunk) {
    //        console.log('Response: ' + chunk);
    //    });
    //});
    //
    //// post the data
    ////post_req.write(post_data);
    //post_req.end();


    var options = {
        url: 'https://mappingbird.com/api/points/10',
        headers: {
            'Authorization': 'Token 35f325cdf32f2b203cacf8346c4e4c787d7668fc'
        }
    };


    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);

            console.log("response.body : ", info);
        } else {
            console.log("response.statusCode : ", response.statusCode);
            console.log("response.body : ", response.body);
        }
    }

    request(options, callback);


    //var Request = unirest.get('https://mappingbird.com/api/points/10');
    //
    //Request.header('Authorization', 'Token 35f325cdf32f2b203cacf8346c4e4c787d7668fc').end(function (response) {
    //    console.log(response.body);
    //});

}

module.exports = router;