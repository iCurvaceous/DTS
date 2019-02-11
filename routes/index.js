var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/dts';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
    UserData.find()
        .then(function(doc) {
          res.render('testcase', {items: doc});
        });
  });

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();

  res.redirect('/testcase');
});

router.post('/update', function(req, res, next) {
    var id = req.body.id;
  
    UserData.findById(id, function(err, doc) {
      if (err) {
        console.error('error, no entry found');
      }
      doc.title = req.body.title;
      doc.content = req.body.content;
      doc.author = req.body.author;
      doc.save();
    })
    res.redirect('/testcase');
  });

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/testcase');
});

//Route to index
router.get('/', function(req, res, next){
    res.render('index');
});

//Route to login
router.get('/login', function(req,res){
    res.render('login');
});

//Route to login
router.get('/register', function(req,res){
    res.render('register');
});

router.get('/testcase', function(req,res){
    res.render('testcase');
});

module.exports = router;