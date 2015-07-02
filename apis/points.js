/**
 * Created by Shih-Wei on 2015-06-09.
 */

var express = require('express');
var router = express.Router();
var url = require('url');
var PointModel = require('../models/point');
var errorHandler = require('../utils/ErrorHandler');

router.route('/points')
    .get(function (req, res) {

        PointModel.find({}, function (err, docs) {
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
        errorHandler.handle404();

    });


router.route('/points/:id') //
    .get(function (req, res) {


        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        console.log('query :', query);

        try {
            if (query.name) {
                PointModel.find({name: query.name}, function (err, docs) {
                    if (err) {
                        res.json({message: 'error ...'});
                    } else {
                        if (docs) {
                            console.log('success');
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
        } catch (e) {
            console.log('error :', e);

            res.json({
                message: 'error'
            })
        }
    })

    .post(function (req, res) {

        var newPoint = new PointModel({
            name: "Hill",
            age: 111,
            DOB: new Date().getTime(),
            isAlive: true
        });

        newPoint.save( function(error, data){
            if(error){
                res.json(error);
            }
            else{
                res.json(data);
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


        console.log('query :', query);
        console.log('req.params.id :', req.params.id);

        if (req.params.id) {
            PointModel.remove({name: query.name}, function (err) {
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