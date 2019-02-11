//API's
var express = require('express');
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/dts';
var routes = require('./routes/index');
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

//makes router public
module.exports = router;
module.exports = mongoose;

//routes for paths
app.use(express.static(__dirname+'/views'));
app.use('/', routes);

//starts server
app.listen(port, function(){
    console.log("Server is running on Port " + port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
  
  module.exports = app;