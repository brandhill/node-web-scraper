/**
 * Created by Shih-Wei on 2015-06-09.
 */


var express = require('express');
var router = express.Router();
var url = require('url');
var mongoose = require('mongoose');


var collectionSchema = new mongoose.Schema({
    name: String,
    place: String,
    url: String,
    updateDate: Date,
    createDate: Date,
    isAlive: Boolean
});


router.route('/collections')
    .get(function (req, res) {
        res.json({
            message: 'give you all users'
        })
    });


router.route('/collections/:id')
    .get(function (req, res) {


        var User = mongoose.model('User', collectionSchema);
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;


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

        var User = mongoose.model('User', collectionSchema);

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

        var User = mongoose.model('User', collectionSchema);
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