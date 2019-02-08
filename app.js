var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

//assert is a built in packaging nodejs normally used for testing
//allows us to compare values etc. 
//use this when connect to mongoDB database or operations
//to check if everything went right
var assert = require('assert');
var path = 5000;


router.get('/', function(req, res, next){

});

router.post('/insert', function(req, res, next){

});

router.post('/update', function(req, res, next){

});

router.post('/delete', function(req, res, next){

});

//makes router public
module.exports = router;