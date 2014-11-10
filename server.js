'use strict'; 

var express      = require('express');
var session      = require('express-session');
var path         = require('path');
var mongoose     = require('mongoose');
var dotenv       = require('dotenv');
var fs           = require('fs');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var passport     = require('passport');


// setup dotenv
dotenv.load();

// create express app
var app = express();

// setup mongoose
mongoose.connect(process.env.MONGO_URL);

// load models
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  return require(modelsPath + '/' + file);
});

// settings
app.set('port', process.env.PORT || 3000);

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// setup passport
require('./config/passport')(passport);

// setup different api
require('./api/shouts')(app);
require('./api/users')(app);
require('./api/auth')(app);


app.listen(3000);