'use strict';
require("babel/register");
// var jsonServer = require('json-server')
// var server = jsonServer.create() // Returns an Express server
// var router = jsonServer.router('db.json') // Returns an Express router

// server.use(jsonServer.defaults) // logger, static and cors middlewares
// server.use(router) // Mount router on '/'

// server.listen(3000)

var PORT          = process.env.PORT || 3000;
var someData      = require('./db.json');
var express       = require('express');
var bodyParser    = require('body-parser');
var expressDomain = require('express-domain');
var passport      = require('passport');
var morgan        = require('morgan');
var mithrilRender = require('mithril-node-render');
var app           = express();
var _             = require('lodash');
var template      = _.template(require('fs').readFileSync('./src/index.html'));

app.disable('x-powered-by');
app.use(expressDomain());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/api/products', function (req, res) {
    res.send(someData.products);
});

app.get('/', function (req, res) {
    res.send(template({ prefetch: mithrilRender(require('./src/store')) }));
});

app.listen(PORT);
console.log('listening on ' + PORT);
module.exports = app;
