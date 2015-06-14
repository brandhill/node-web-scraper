/**
 * Created by Shih-Wei on 2015-06-09.
 */

var PointSchema = require(__base + 'MongoDB_schema/point');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var mongodb = require('mongodb');
//var mongodbServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true, poolSize: 10});
//var db = new mongodb.Db('mydb', mongodbServer);
//var Point = mongoose.model('Point', PointSchema);
var url = require('url');


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    age: Number,
    DOB: Date,
    isAlive: Boolean
});

router.route('/points/:id') //
    .get(function (req, res) {

        //console.log('isHeaderValid : ' + isHeaderValid(req));

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
                        res.json(docs);
                    } else {
                        res.json({message: 'not found ...'});
                    }
                }

            });
        } else {
            res.json({
                message: 'invalid params'
            })
        }
    })

    .post(function (req, res) {

        console.log('req : ', req);

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
        res.json({
            id: req.params.id,
            message: 'The delete api for image: ' + req.params.id
        })
    });

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

module.exports = router;