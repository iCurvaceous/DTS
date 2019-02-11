//API's
var express = require('express');
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/dts';
var mongoose = require('mongoose');
//assert is a built in packaging nodejs normally used for testing
//allows us to compare values etc. 
//use this when connect to mongoDB database or operations
//to check if everything went right
var assert = require('assert');
var port = 5000;

//security login & password encryption(hash)
//var passport = require('passport');
//var {ensureAuthenticated} = require('./helpers/auth');

//gets rid of warning for Mongoose
mongoose.Promise = global.Promise

//connect to mongodb using mongoose
mongoose.connect(url,{
    useMonogoClienct:true
})
.then(function(){console.log("MongoDB Connected.")})
.catch(function(err){console.log(err)});

//sets up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Functions needed to run body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

router.post('/get-data', function(req, res, next){
    var resultArray = [];
    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err){
         assert.equal(null, err);   
        });
    });
});

router.post('/insert', function(req, res, next){
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('user-data').insertOne(item, function(err, result){
            assert.equal(null, error);
            console.log('Item inserted');
        });
    });

    res.redirect('/');
});

router.post('/update', function(req, res, next){

});

router.post('/delete', function(req, res, next){

});

//makes router public
module.exports = router;
module.exports = mongoose;

//routes for paths
app.use(express.static(__dirname+'/views'));
app.use('/', router);

//starts server
app.listen(port, function(){
    console.log("Server is running on Port " + port);
});
