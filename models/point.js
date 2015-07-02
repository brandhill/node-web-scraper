/**
 * Created by hill on 15/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema ;
var ObjectId = Schema.ObjectId;

var schema = new mongoose.Schema({
    name: String,
    age: Number,
    DOB: Date,
    isAlive: Boolean
});

module.exports = mongoose.model('Point', schema);
