'use strict'; 

var express    = require('express');
var path       = require('path');
var mongoose   = require('mongoose');
var dotenv     = require('dotenv');
var fs         = require('fs');
var bodyParser = require('body-parser');


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// setup different api
require('./api/shouts')(app);


app.listen(3000);