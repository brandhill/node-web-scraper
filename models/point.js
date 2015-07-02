/**
 * Created by hill on 15/6/14.
 */

//module.exports = function(mongoose) {
//    //var Schema = new Schema({
//    //    id                  :    {type: ObjectId, index:true},
//    //    name:      { type: String },
//    //    address:     { type: String},
//    //    create_at: { type: Date, default: Date.now },
//    //    update_at: { type: Date, default: Date.now }
//    //});
//
//    var schema = new mongoose.Schema({
//        name: String,
//        age: Number,
//        DOB: Date,
//        isAlive: Boolean
//    });
//
//
//    var models = {
//        Points : mongoose.model('Point', schema)
//    };
//
//
//    return models;
//}


var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var schema = new mongoose.Schema({
    name: String,
    age: Number,
    DOB: Date,
    isAlive: Boolean
});

module.exports = mongoose.model('Point', schema);
