/**
 * Created by Shih-Wei on 2015-06-09.
 */
var express = require('express');
var router = express.Router();

router.route('/points/:id') // 块 id 讽把计
    .get(function (req, res) {
        res.json({
            id: req.params.id, //  req.params.id 眔把计
            message: 'The get api for image: ' + req.params.id
        })
    })

    .post(function(req, res) {
        res.json({
            id: req.params.id,
            message: 'The post api for image: ' + req.params.id
        })
    })

    .put(function(req, res) {
        res.json({
            id: req.params.id,
            message: 'The put api for image: ' + req.params.id
        })
    })

    .delete(function(req, res) {
        res.json({
            id: req.params.id,
            message: 'The delete api for image: ' + req.params.id
        })
    });

module.exports = router;