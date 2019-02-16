//CONFIG---------------------------------------------------

var assert = require('assert');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var methodOverride = require("method-override");
var port = 5000;
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var {ensureAuthenticated} = require('./helpers/auth');

var users = require('./user_app');

//Passportjs Config
require('./config/passport')(passport);

//gets rid of warning for Mongoose
mongoose.Promise = global.Promise;

//connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/dts",{
    useMonogoClienct:true
})
.then(function(){console.log("MongoDB Connected.")})
.catch(function(err){console.log(err)});

//sets up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Functions needed to run body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup Express
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//---------------------------------------------------------


//MODELS--------------------------------------------------
//Load in Entry Model
require('./models/bug_model');
require('./models/project_model');
require('./models/report_model');
require('./models/user_model');

var Bug = mongoose.model('BugList');
var Report = mongoose.model('ReportList');
var Users = mongoose.model('UserList');
var Project = mongoose.model('ProjectList');
//---------------------------------------------------------


// MAIN ROUTES -----------------------------------------

//Route to index
router.get('/', ensureAuthenticated, function(req,res){
    res.render('index');
});

router.get('/home', function(req,res){
    res.render('home');
});

router.get('/about', function(req,res){
    res.render('about');
});

router.get('/account', function(req,res){
    res.render('account');
});

router.get('/register', function(req,res){
    res.render('register');
});

router.get('/forgotpass', function(req,res){
    res.render('forgotpass');
});

router.get('/report', function(req,res){
    res.render('report');
});

router.get('/tasks', function(req,res){
    res.render('tasks');
});

router.get('/admin', function(req,res){
    res.render('admin');
});

router.get('/contact', function(req,res){
    res.render('contact');
});

router.get('/help', function(req,res){
    res.render('help');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect();
});
//------------------------------------------------------


//ACTION------------------------------------------------CHECK

//sending data to project page
app.get('/project', function(req, res){
    Project.find({})
    .then(function(project_entry,bug_entry){
        res.render('project', {
            project_entry:project_entry,
            bug_entry:bug_entry
        });
    });
});

//sending data to bug page
app.get('/bug', function(req, res){
    console.log("request made from fetch.");
    Bug.find({})
    .then(function(bug_entry){
        res.render('bug', {
            bug_entry:bug_entry
        });
    });
});

//create from on project page
app.post('/addproject', function(req,res){
    console.log(req.body);
    var newProject = {
        name:req.body.name,
        desc:req.body.desc,
        company:req.body.company,
        phase:req.body.phase,
        status:req.body.status,
    }
    new Project(newProject)
    .save().then(function(){
        res.redirect('/project')
    });
});

//create from on bug
app.post('/addbug', function(req,res){
    console.log(req.body);
    var newBug = {
        test_num:req.body.test_num,
        category:req.body.category,
        test_conditions:req.body.test_conditions,
        game_section:req.body.game_section,
        test_env:req.body.test_env,
        function_tested:req.body.function_tested,
        tester_action:req.body.tester_action,
        expected_result:req.body.expected_result,
        actual_result:req.body.actual_result,
        test_values:req.body.test_values,
        system_version:req.body.system_version,
        build_version:req.body.build_version,
        script_file:req.body.script_file,
        desc:req.body.desc,
        score:req.body.score,
        status:req.body.status,
        priority:req.body.priority,
        phase:req.body.phase,
        project:req.body.project,
        author:req.body.author,
        company:req.body.company
        //assigned_user:req.body.assigned_user,
        //date_assigned:req.body.date_assigned,
    }
    new Bug(newBug)
    .save().then(function(){
        res.redirect('/bug')
    });
});

//login from on _navbar
router.post('/adduser', function(req,res,next){
    passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect:'/'
    })(req,res,next);
    console.log(res);
});

//------------------------------------------------------


//routes for PATHS--------------------------------------

app.use('/', router);
//NOTE: To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(__dirname+'/views'));
app.use('/user_app',users);

app.listen(port, function(){
    console.log("Server is running on Port " + port);
});

//------------------------------------------------------


//ERROR HANDLER-----------------------------------------

//starts server
/*
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
*/
  //--------------------------------------------------