/**
 * Created by Shih-Wei on 2015-06-09.
 */
var express = require('express');
var router = express.Router();

router.route('/points/:id') // 輸入 id 當作參數
    .get(function (req, res) {
        res.json({
            id: req.params.id, // 以 req.params.id 取得參數
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