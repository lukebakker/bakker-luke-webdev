var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


app.use(session({
    secret: 'adsfaklj',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//require("./test/app");
//require("./assignment/app");
require("./project/app");





var port = process.env.PORT || 3000;

app.listen(port);