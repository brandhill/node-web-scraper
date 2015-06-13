/**
 * Created by Shih-Wei on 2015-06-09.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true, poolSize: 10});
var db = new mongodb.Db('mydb', mongodbServer);

router.route('/points/:id') //
    .get(function (req, res) {

        console.log('isHeaderValid : ' + isHeaderValid(req));

        db.open(function () {
            db.collection('contact', function (err, collection) {
                /* Querying */
                collection.find({name: 'David'}, function (err, data) {
                    /* Found this People */
                    if (data) {
                        console.log('Name: ' + data.name + ', email: ' + data.email);
                        console.log('data: ' + data);
                        //var response = JSON.stringify(data);
                        ////res.json({
                        ////    response
                        ////})
                        //res.write(response);
                    } else {
                        console.log('Cannot found');
                    }
                });
            });
        });

        res.json({
            id: req.params.id, //
            message: 'The get api for image: ' + req.params.id
        })
    })

    .post(function (req, res) {

        isExist(function(isExist) {
            if(isExist){
                // update
                console.log('isExist');
            }else{
                // insert
                db.open(function () {
                    /* Select 'contact' collection */
                    db.collection('contact', function (err, collection) {

                        var document = {name: "David", title: "About MongoDB", email: "ggInInDer@gmail.com"};
                        collection.insert(document, {w: 1}, function (err, records) {
                            if(records){
                                console.log("Record added as " + records[0]._id);
                            }
                        });
                    });
                });
            }
        });



        res.json({
            id: req.params.id,
            message: 'The post api for image: ' + req.params.id
        })
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

function isExist(callback){

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

function isHeaderValid(req) {
    return req.headers['authorization'] ? true : false;
}

module.exports = router;