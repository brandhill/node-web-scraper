/**
 * Created by Hill on 15/7/2.
 */


var handle500 = function(){

    console.log("TODO : handle500");
}

var handle404 = function(){

    console.log("TODO : handle404");
}

var error = {
    "handle404" : handle404,
    "handle500" : handle500
}

module.exports = error;