/**
 * Created by hill on 15/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
    name:      { type: String },
    address:     { type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

//PointSchema.pre('save', function(next) {
//    // do something...
//})
//
//PointSchema.statics = {
//
//    getPointByName: function (name, callback) {
//        this.findOne({name: name})
//            .exec(callback)
//    },
//
//    insertPoint: function (name, callback) {
//        this.findOne({name: name})
//            .exec(callback)
//    }
//
//}
//
//mongoose.model('Point', PointSchema);
//mongoose.connect('mongodb://localhost/test');
//
//
//module.exports = mongoose;